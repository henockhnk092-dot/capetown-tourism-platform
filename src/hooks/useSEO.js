import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageSEO, SITE_URL } from '../utils/seo';

const setMeta = (attr, key, content) => {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

// Keeps <title>, description, canonical and share tags in sync with the current route
const useSEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { path, title, description, noindex } = getPageSEO(pathname);
    const url = SITE_URL + (path === '/' ? '/' : path);

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);
  }, [pathname]);
};

export default useSEO;
