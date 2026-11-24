// Sends visitors from old addresses to the main domain, keeping the page and query
// (so old shared links and poster QR codes still work).
const MAIN_HOST = 'capetownplanner.com';
const OLD_HOSTS = ['capetown.hnkiot.com', 'www.capetownplanner.com'];

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (OLD_HOSTS.includes(url.hostname)) {
    url.hostname = MAIN_HOST;
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
