// Runs after `vite build`:
//  - writes dist/<route>.html for each public page, so link previews and
//    crawlers that don't run JavaScript see that page's own title and description
//  - writes dist/sitemap.xml
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { PAGE_SEO, SITE_URL, getPageSEO } from '../src/utils/seo.js';
import { FAQS, PLACES } from '../src/data/guides.js';

const dist = new URL('../dist/', import.meta.url);
const template = readFileSync(new URL('index.html', dist), 'utf8');

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const setTag = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`postbuild-seo: tag not found: ${pattern}`);
  return html.replace(pattern, (_, before, after) => before + escape(value) + after);
};

// Home > (Attractions >) page
const crumbs = (path) => {
  const list = [{ name: 'Home', url: `${SITE_URL}/` }];
  const place = PLACES.find((p) => path === `/attractions/${p.slug}`);
  if (place) list.push({ name: 'Attractions', url: `${SITE_URL}/attractions` }, { name: place.name, url: SITE_URL + path });
  else list.push({ name: PAGE_SEO[path].title, url: SITE_URL + path });
  return list;
};

// FAQ answers and attraction details, so search engines can show them directly
const extraSchema = (path, url) => {
  if (path === '/faq') {
    return [{
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: FAQS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    }];
  }
  const place = PLACES.find((p) => path === `/attractions/${p.slug}`);
  if (!place) return [];
  return [{
    '@type': 'TouristAttraction',
    '@id': `${url}#place`,
    name: place.name,
    description: place.summary,
    url,
    image: SITE_URL + place.image,
    geo: { '@type': 'GeoCoordinates', latitude: place.coordinates.lat, longitude: place.coordinates.lng },
    containedInPlace: { '@type': 'City', name: 'Cape Town' },
    sameAs: place.official.url,
  }];
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

  // Page's own share image (made by scripts/og-images.py), else the site image
  const slug = path.slice(1);
  if (slug && existsSync(new URL(`og/${slug}.jpg`, dist))) {
    const image = `${SITE_URL}/og/${slug}.jpg`;
    const alt = `${PAGE_SEO[path].title}: capetownplanner.com`;
    html = setTag(html, /(<meta property="og:image" content=")[^"]*(")/, image);
    html = setTag(html, /(<meta property="og:image:secure_url" content=")[^"]*(")/, image);
    html = setTag(html, /(<meta name="twitter:image" content=")[^"]*(")/, image);
    html = setTag(html, /(<meta property="og:image:alt" content=")[^"]*(")/, alt);
    html = setTag(html, /(<meta name="twitter:image:alt" content=")[^"]*(")/, alt);
  }

  // Structured data for search engines: what the page is and where it sits in the site
  if (!noindex && path !== '/') {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: 'en-ZA',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          primaryImageOfPage: `${SITE_URL}/og/${slug}.jpg`,
          breadcrumb: { '@id': `${url}#breadcrumb` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: crumbs(path).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
        },
        ...extraSchema(path, url),
      ],
    };
    if (!existsSync(new URL(`og/${slug}.jpg`, dist))) delete data['@graph'][0].primaryImageOfPage;
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>\n</head>`);
  }
  return html;
};

const today = new Date().toISOString().slice(0, 10);
const indexed = [];

for (const [path, page] of Object.entries(PAGE_SEO)) {
  const html = renderPage(path);
  // Cloudflare Pages serves /about from about.html
  const file = new URL(path === '/' ? 'index.html' : `${path.slice(1)}.html`, dist);
  mkdirSync(new URL('.', file), { recursive: true });
  writeFileSync(file, html);
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
