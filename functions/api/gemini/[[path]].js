// Cloudflare Pages Function: forwards Gemini requests from the site to Google,
// adding the API key on the server so it never reaches the browser.
// The key is the encrypted Pages secret GEMINI_API_KEY.

const GEMINI_ORIGIN = 'https://generativelanguage.googleapis.com';
const ALLOWED_ORIGINS = ['https://capetownplanner.com', 'https://capetown.hnkiot.com', 'https://capetown-tourism.pages.dev'];
// Only model calls the site actually makes
const ALLOWED_PATH = /^v1beta\/models\/[a-z0-9.-]+:(generateContent|streamGenerateContent)$/;

export async function onRequestPost({ request, env, params }) {
  const path = (params.path || []).join('/');
  if (!ALLOWED_PATH.test(path)) {
    return new Response('Not found', { status: 404 });
  }

  // Block other websites from using this endpoint (and our Gemini quota)
  const origin = request.headers.get('Origin');
  const isPreview = origin && origin.endsWith('.capetown-tourism.pages.dev');
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !isPreview) {
    return new Response('Forbidden', { status: 403 });
  }

  if (!env.GEMINI_API_KEY) {
    return new Response('Gemini is not configured', { status: 500 });
  }

  const upstream = new URL(`${GEMINI_ORIGIN}/${path}`);
  const search = new URL(request.url).searchParams;
  if (search.get('alt')) upstream.searchParams.set('alt', search.get('alt'));

  const response = await fetch(upstream, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': env.GEMINI_API_KEY,
    },
    body: request.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
