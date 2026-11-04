// Tells Bing, Yandex, Seznam, Naver and other IndexNow engines that the
// site's pages changed. Run after a deploy: `npm run indexnow`.
import { PAGE_SEO, SITE_URL } from '../src/utils/seo.js';

const KEY = 'cf5a3b5086dee25274923f7f674c066e'; // must match public/<KEY>.txt
const host = new URL(SITE_URL).host;
const urlList = Object.entries(PAGE_SEO)
  .filter(([, page]) => !page.noindex)
  .map(([path]) => SITE_URL + (path === '/' ? '/' : path));

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`, await res.text());
if (!res.ok) process.exit(1);
