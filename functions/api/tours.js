// Cloudflare Pages Function: popular Cape Town tours from the Viator Partner API.
// Secret: VIATOR_API_KEY. Variable VIATOR_SANDBOX = "1" while the key is a sandbox key.
// Results are cached for 6 hours, so visitors never use up the API limit.

const CAPE_TOWN = '318';
const COUNT = 12;
const PID = 'P00333785';
const MCID = '42383';

// Booking link on the public Viator site with our tracking IDs (the sandbox returns a test host)
const bookingUrl = (raw) => {
  const url = new URL(raw);
  url.protocol = 'https:';
  url.host = 'www.viator.com';
  url.searchParams.set('pid', PID);
  url.searchParams.set('mcid', MCID);
  url.searchParams.set('medium', 'api');
  return url.toString();
};

const coverImage = (images = []) => {
  const cover = images.find((i) => i.isCover) || images[0];
  const variants = cover?.variants || [];
  const pick = variants.find((v) => v.width === 480 && v.height === 320) || variants.find((v) => v.width >= 400) || variants[0];
  // The sandbox returns a test image host that some networks block; the main CDN has the same paths
  return pick?.url ? pick.url.replace('://hare-media-cdn.tripadvisor.com/', '://media-cdn.tripadvisor.com/') : null;
};

const durationText = (d = {}) => {
  const from = d.fixedDurationInMinutes ?? d.variableDurationFromMinutes;
  const to = d.variableDurationToMinutes;
  const fmt = (m) => (m >= 60 ? `${Math.round((m / 60) * 10) / 10} h` : `${m} min`);
  if (!from) return null;
  return to && to !== from ? `${fmt(from)}–${fmt(to)}` : fmt(from);
};

export async function onRequestGet({ request, env, waitUntil }) {
  if (!env.VIATOR_API_KEY) return new Response('Not configured', { status: 503 });

  // Optional search words (e.g. "Robben Island") and number of tours
  const params = new URL(request.url).searchParams;
  const q = (params.get('q') || '').trim().slice(0, 40);
  if (q && !/^[\p{L}\p{N} &'’-]+$/u.test(q)) return new Response('Bad request', { status: 400 });
  const count = Math.min(Math.max(Number(params.get('n')) || COUNT, 1), COUNT);

  const cache = caches.default;
  const cacheKey = new Request(new URL(`/api/tours?v=3&q=${encodeURIComponent(q.toLowerCase())}&n=${count}`, request.url));
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const host = env.VIATOR_SANDBOX === '1' ? 'api.sandbox.viator.com' : 'api.viator.com';
  const headers = {
    'exp-api-key': env.VIATOR_API_KEY,
    Accept: 'application/json;version=2.0',
    'Accept-Language': 'en-US',
    'Content-Type': 'application/json',
  };
  const upstream = q
    ? await fetch(`https://${host}/partner/search/freetext`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          searchTerm: q,
          productFiltering: { destination: CAPE_TOWN },
          searchTypes: [{ searchType: 'PRODUCTS', pagination: { start: 1, count } }],
          currency: 'ZAR',
        }),
      })
    : await fetch(`https://${host}/partner/products/search`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          filtering: { destination: CAPE_TOWN, rating: { from: 4 } },
          pagination: { start: 1, count },
          currency: 'ZAR',
        }),
      });
  if (!upstream.ok) return new Response('Tours unavailable', { status: 502 });
  const raw = await upstream.json();
  const body = q ? { products: raw.products?.results || [], totalCount: raw.products?.totalCount } : raw;

  const tours = (body.products || [])
    .filter((p) => p.productUrl && p.pricing?.summary?.fromPrice)
    .map((p) => ({
      code: p.productCode,
      title: p.title,
      image: coverImage(p.images),
      rating: Math.round((p.reviews?.combinedAverageRating || 0) * 10) / 10,
      reviews: p.reviews?.totalReviews || 0,
      price: Math.round(p.pricing.summary.fromPrice),
      duration: durationText(p.duration),
      freeCancellation: (p.flags || []).includes('FREE_CANCELLATION'),
      url: bookingUrl(p.productUrl),
    }));

  const response = new Response(JSON.stringify({ tours, total: body.totalCount || tours.length }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=21600' },
  });
  if (tours.length) waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
