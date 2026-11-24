// Cloudflare Pages Function: recent one-way fares to Cape Town from Travelpayouts.
// The token is the encrypted Pages secret TRAVELPAYOUTS_TOKEN. Results are cached
// for an hour, so visitors can't use up the API limit.

const ORIGINS = ['JNB', 'DUR', 'LON', 'AMS', 'FRA', 'PAR', 'DXB', 'NYC', 'FIH', 'NBO', 'LOS', 'WDH'];

export async function onRequestGet({ request, env, waitUntil }) {
  const origin = new URL(request.url).searchParams.get('origin');
  if (!ORIGINS.includes(origin)) return new Response('Unknown origin', { status: 400 });
  if (!env.TRAVELPAYOUTS_TOKEN) return new Response('Not configured', { status: 503 });

  const cache = caches.default;
  const cacheKey = new Request(new URL(`/api/flights?origin=${origin}`, request.url));
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const upstream = await fetch(
    `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=CPT&currency=zar&sorting=price&one_way=true&limit=30`,
    { headers: { 'X-Access-Token': env.TRAVELPAYOUTS_TOKEN } }
  );
  if (!upstream.ok) return new Response('Fares unavailable', { status: 502 });
  const body = await upstream.json();
  if (!body.success) return new Response('Fares unavailable', { status: 502 });

  // The six cheapest fares on different days, shown in date order
  const days = new Set();
  const fares = [];
  for (const f of body.data || []) {
    const date = f.departure_at.slice(0, 10);
    if (days.has(date) || !String(f.link).startsWith('/search/')) continue;
    days.add(date);
    fares.push({ from: f.origin_airport || f.origin, price: f.price, date, airline: f.airline, stops: f.transfers, link: f.link });
    if (fares.length === 6) break;
  }
  fares.sort((a, b) => a.date.localeCompare(b.date));

  const response = new Response(JSON.stringify({ fares }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
  });
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
