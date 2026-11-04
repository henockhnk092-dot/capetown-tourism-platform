// Runs after `vite build`:
//  - writes dist/<route>.html for each public page, so link previews and
//    crawlers that don't run JavaScript see that page's own title and description
//  - writes dist/sitemap.xml
import { readFileSync, writeFileSync } from 'node:fs';
import { PAGE_SEO, SITE_URL, getPageSEO } from '../src/utils/seo.js';

const dist = new URL('../dist/', import.meta.url);
const template = readFileSync(new URL('index.html', dist), 'utf8');

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const setTag = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`postbuild-seo: tag not found: ${pattern}`);
  return html.replace(pattern, (_, before, after) => before + escape(value) + after);
};

const renderPage = (path) => {
  const { title, description, noindex } = getPageSEO(path);
  const url = SITE_URL + (path === '/' ? '/' : path);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  html = setTag(html, /(<meta name="description" content=")[^"]*(")/, description);
  html = setTag(html, /(<meta name="robots" content=")[^"]*(")/, noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, url);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, title);
  html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, description);
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, url);
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, title);
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, description);
  return html;
};

const today = new Date().toISOString().slice(0, 10);
const indexed = [];

for (const [path, page] of Object.entries(PAGE_SEO)) {
  const html = renderPage(path);
  // Cloudflare Pages serves /about from about.html
  writeFileSync(new URL(path === '/' ? 'index.html' : `${path.slice(1)}.html`, dist), html);
  if (!page.noindex) indexed.push(path);
}

// Unknown paths fall back to a noindex copy, so typos never get indexed
writeFileSync(new URL('404.html', dist), renderPage('/404'));

const priority = (path) => (path === '/' ? '1.0' : ['/privacy', '/terms'].includes(path) ? '0.3' : '0.8');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed
  .map((path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '/events' || path === '/blog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority(path)}</priority>
  </url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(new URL('sitemap.xml', dist), sitemap);

console.log(`postbuild-seo: ${Object.keys(PAGE_SEO).length} pages, ${indexed.length} in sitemap`);
