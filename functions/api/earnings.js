// Cloudflare Pages Function: affiliate clicks and commission from Travelpayouts, for the site owner only.
// The Firebase ID token is checked with Firebase Auth, and the account's email must be verified
// and listed in the OWNER_EMAILS secret (comma separated). Nothing is cached.
// Secrets: TRAVELPAYOUTS_TOKEN, OWNER_EMAILS. Plain variable: FIREBASE_WEB_API_KEY.

const PERIODS = [7, 30, 90];
const ROW_LIMIT = 1000;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

async function signedInUser(idToken, apiKey) {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  return res.ok ? (await res.json()).users?.[0] : null;
}

export async function onRequestGet({ request, env }) {
  const idToken = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!idToken) return json({ error: 'sign in required' }, 401);
  if (!env.TRAVELPAYOUTS_TOKEN || !env.OWNER_EMAILS || !env.FIREBASE_WEB_API_KEY) return json({ error: 'not configured' }, 503);

  const user = await signedInUser(idToken, env.FIREBASE_WEB_API_KEY);
  if (!user) return json({ error: 'sign in required' }, 401);
  const owners = env.OWNER_EMAILS.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (!user.emailVerified || !owners.includes((user.email || '').toLowerCase())) return json({ error: 'owner only' }, 403);

  const days = Number(new URL(request.url).searchParams.get('days') || 30);
  if (!PERIODS.includes(days)) return json({ error: 'bad request' }, 400);
  const day = (offset) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);
  const from = day(days - 1);
  const to = day(0);

  const call = async (path, body) => {
    const res = await fetch(`https://api.travelpayouts.com/${path}`, {
      method: body ? 'POST' : 'GET',
      headers: { 'X-Access-Token': env.TRAVELPAYOUTS_TOKEN, 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Travelpayouts ${res.status}`);
    return res.json();
  };
  const dates = [
    { field: 'date', op: 'ge', value: from },
    { field: 'date', op: 'le', value: to },
  ];

  try {
    const [balance, totals, rows] = await Promise.all([
      call('finance/v2/get_user_balance?currency=usd'),
      call('statistics/v1/execute_query', {
        fields: ['redirects_count', 'actions_count', 'paid_profit_usd_sum', 'processing_profit_usd_sum'],
        filters: dates,
      }),
      call('statistics/v1/execute_query', {
        fields: ['date', 'type', 'campaign_name_en', 'state', 'paid_profit_usd', 'processing_profit_usd'],
        filters: [...dates, { field: 'type', op: 'in', value: ['redirect', 'action'] }],
        limit: ROW_LIMIT,
        offset: 0,
      }),
    ]);

    const daily = {};
    for (let i = days - 1; i >= 0; i--) daily[day(i)] = { date: day(i), clicks: 0, bookings: 0 };
    const brands = {};
    for (const row of rows.results) {
      const name = row.campaign_name_en || 'Other';
      const brand = (brands[name] ||= { name, clicks: 0, bookings: 0, pending: 0, paid: 0 });
      const slot = daily[String(row.date).slice(0, 10)];
      if (row.type === 'redirect') {
        brand.clicks++;
        if (slot) slot.clicks++;
      } else if (row.state !== 'cancelled') {
        brand.bookings++;
        brand.pending += Number(row.processing_profit_usd) || 0;
        brand.paid += Number(row.paid_profit_usd) || 0;
        if (slot) slot.bookings++;
      }
    }

    const sum = totals.results[0] || {};
    return json({
      from,
      to,
      balance: Number(balance.balance?.usd) || 0,
      clicks: Number(sum.redirects_count) || 0,
      bookings: Number(sum.actions_count) || 0,
      pending: Number(sum.processing_profit_usd_sum) || 0,
      paid: Number(sum.paid_profit_usd_sum) || 0,
      daily: Object.values(daily),
      brands: Object.values(brands).sort((a, b) => b.paid + b.pending - a.paid - a.pending || b.clicks - a.clicks),
      partial: rows.total_rows > ROW_LIMIT,
    });
  } catch {
    return json({ error: 'statistics unavailable' }, 502);
  }
}
