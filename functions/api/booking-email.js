// Cloudflare Pages Function: emails a reservation-request confirmation to the guest
// with Resend, and a copy to HNK.
// Safety: the recipient is never taken from the request. The Firebase ID token is
// checked with Firebase Auth and the email goes only to that account's verified address.
// Secrets: RESEND_API_KEY. Plain variable: FIREBASE_WEB_API_KEY (public web key).

const FROM = 'Cape Town Tourism <bookings@hnkiot.com>';
const HNK_COPY = 'henock@hnkiot.com';
const ALLOWED_ORIGINS = ['https://capetownplanner.com', 'https://capetown.hnkiot.com', 'https://capetown-tourism.pages.dev'];

const escapeHtml = (value) =>
  String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

async function verifiedEmail(idToken, apiKey) {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) return null;
  const user = (await res.json()).users?.[0];
  return user?.email ? { email: user.email, name: user.displayName || '' } : null;
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  const isPreview = origin && origin.endsWith('.capetown-tourism.pages.dev');
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !isPreview) return json({ error: 'forbidden' }, 403);
  if (!env.RESEND_API_KEY || !env.FIREBASE_WEB_API_KEY) return json({ error: 'not configured' }, 503);

  const idToken = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!idToken) return json({ error: 'sign in required' }, 401);
  const guest = await verifiedEmail(idToken, env.FIREBASE_WEB_API_KEY);
  if (!guest) return json({ error: 'sign in required' }, 401);

  let booking;
  try {
    booking = await request.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }

  const venue = String(booking.venue || '').slice(0, 120);
  const reference = String(booking.reference || '').slice(0, 20);
  const details = Array.isArray(booking.details) ? booking.details.slice(0, 12) : [];
  if (!venue || !reference) return json({ error: 'bad request' }, 400);

  const rows = details
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b7280">${escapeHtml(label)}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(value)}</td></tr>`)
    .join('');

  const html = `<!doctype html><html><body style="margin:0;background:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;color:#111827">
<div style="max-width:560px;margin:0 auto;padding:24px">
<div style="background:#111827;color:#fff;border-radius:12px 12px 0 0;padding:24px">
<p style="margin:0;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#fbbf24">Reservation request received</p>
<h1 style="margin:8px 0 0;font-size:22px">${escapeHtml(venue)}</h1></div>
<div style="background:#fff;border-radius:0 0 12px 12px;padding:24px">
<p style="margin:0 0 16px">Hi ${escapeHtml(guest.name || 'there')}, thank you for your request. We will confirm availability with the venue and get back to you by email or WhatsApp.</p>
<table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
<tr><td style="padding:6px 12px 6px 0;color:#6b7280">Reference</td><td style="padding:6px 0;font-weight:600">${escapeHtml(reference)}</td></tr>${rows}</table>
<p style="margin:0 0 16px;font-size:14px;color:#374151">Nothing is charged online: you pay the venue directly once your booking is confirmed.</p>
<p style="margin:0;font-size:14px"><a href="https://capetownplanner.com/my-bookings" style="color:#111827;font-weight:600">View My Bookings</a></p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
<p style="margin:0;font-size:12px;color:#6b7280">Cape Town Tourism Platform by HNK IoT Solutions · henock@hnkiot.com · WhatsApp +27 61 471 9400</p>
</div></div></body></html>`;

  const text = [
    `Reservation request received: ${venue}`,
    `Reference: ${reference}`,
    ...details.map(([label, value]) => `${label}: ${value}`),
    '',
    'We will confirm availability with the venue and get back to you. Nothing is charged online.',
    'https://capetownplanner.com/my-bookings',
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [guest.email],
      bcc: [HNK_COPY],
      reply_to: HNK_COPY,
      subject: `Request received: ${venue} (${reference})`,
      html,
      text,
    }),
  });

  return json({ sent: res.ok }, res.ok ? 200 : 502);
}
