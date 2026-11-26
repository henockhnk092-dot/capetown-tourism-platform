// Page titles and descriptions, shared by the in-app <title> updates (useSEO)
// and the post-build script that writes per-route HTML for link previews.
// Plain data only: this file is also imported by Node at build time.
import { PLACES } from '../data/guides.js';

export const SITE_URL = 'https://capetownplanner.com';
export const SITE_NAME = 'Cape Town Planner';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const PAGE_SEO = {
  '/': {
    title: 'Cape Town Planner | Plan Your Cape Town Trip',
    description:
      'Plan your Cape Town trip: top attractions, places to stay, events, safety tips, transport and a free AI travel assistant. Built by HNK IoT Solutions.',
  },
  '/attractions': {
    title: 'Top Cape Town Attractions',
    description:
      'Table Mountain, Robben Island, Cape Point, Kirstenbosch, the V&A Waterfront and more, with opening hours, prices and a map.',
  },
  '/accommodation': {
    title: 'Where to Stay in Cape Town',
    description:
      'Compare Cape Town hotels, guesthouses and backpackers by area, price and rating, then send a reservation request.',
  },
  '/flights': {
    title: 'Flights to Cape Town',
    description:
      'Compare recent fares to Cape Town from Johannesburg, Durban, London, Dubai and more, then search live flights for your dates.',
  },
  '/ai-assistant': {
    title: 'AI Travel Assistant for Cape Town',
    description:
      'Ask our AI assistant anything about Cape Town: what to see, where to eat, how to get around and how to stay safe.',
  },
  '/planner': {
    title: 'Cape Town Itinerary Planner',
    description:
      'Build a day-by-day Cape Town itinerary with AI suggestions, budget estimates and weather tips, then save it or export a PDF.',
  },
  '/blog': {
    title: 'Cape Town Travel Blog',
    description: 'Travel guides, local tips and seasonal ideas for visiting Cape Town and the Western Cape.',
  },
  '/transportation': {
    title: 'Getting Around Cape Town',
    description:
      'MyCiTi buses, trains, ride-hailing, car hire and airport transfers: how to get around Cape Town and what it costs.',
  },
  '/safety': {
    title: 'Cape Town Safety Tips',
    description:
      'Practical safety advice for visitors to Cape Town, emergency numbers and tips for hiking, beaches and nights out.',
  },
  '/events': {
    title: 'Cape Town Events & Festivals',
    description:
      'Upcoming Cape Town events and festivals, including the Jazz Festival, Cape Town Carnival and the Cycle Tour. Add them to your calendar.',
  },
  '/resources': {
    title: 'Cape Town Travel Resources',
    description: 'Useful links, emergency contacts, visa information and travel tools for your Cape Town visit.',
  },
  '/where-to-stay': {
    title: 'Where to Stay in Cape Town: Best Areas',
    description:
      'The best areas to stay in Cape Town for first visits, beaches, nightlife, families and wine, with pros, cons and live hotel prices.',
  },
  '/day-trips': {
    title: 'Day Trips from Cape Town',
    description:
      "Cape Point and the penguins, the Winelands, Hermanus whale watching and Chapman's Peak, with tours and prices.",
  },
  '/airport': {
    title: 'Cape Town Airport Guide: Arriving at CPT',
    description:
      'How to get from Cape Town International Airport to the city, plus SIM cards, money, car hire and driving tips.',
  },
  '/best-time-to-visit': {
    title: 'Best Time to Visit Cape Town, Month by Month',
    description:
      'Cape Town weather, crowds and events for every month, and the best times for beaches, whales, flowers and value.',
  },
  '/faq': {
    title: 'Cape Town Travel FAQ',
    description:
      'Answers about visas, safety, money, tipping, tap water, plugs, load-shedding and getting around Cape Town.',
  },
  '/contact': {
    title: 'Contact Us',
    description:
      'Contact HNK IoT Solutions about the Cape Town Planner: henock@hnkiot.com or WhatsApp +27 61 471 9400.',
  },
  '/about': {
    title: 'About the Platform',
    description:
      'About the Cape Town Planner and the team behind it, HNK IoT Solutions (Pty) Ltd in Cape Town.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How the Cape Town Planner collects, uses and protects your personal information under POPIA.',
  },
  '/terms': {
    title: 'Terms of Service',
    description: 'The terms that apply when you use the Cape Town Planner.',
  },
  // Account pages: useful titles, but kept out of search results
  '/login': { title: 'Log In', noindex: true },
  '/signup': { title: 'Create an Account', noindex: true },
  '/profile': { title: 'My Profile', noindex: true },
  '/favorites': { title: 'My Favorites', noindex: true },
  '/my-bookings': { title: 'My Bookings', noindex: true },
  '/my-itineraries': { title: 'My Itineraries', noindex: true },
  '/earnings': { title: 'Earnings', noindex: true },
};

// One page per attraction, from the guide data
for (const place of PLACES) {
  PAGE_SEO[`/attractions/${place.slug}`] = {
    title: `${place.name}: Visitor Guide, Tips and Tours`,
    description: `${place.tagline} Tips, how to get there, the best time to go and tours with prices.`,
  };
}

export function getPageSEO(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const page = PAGE_SEO[path];
  if (!page) {
    return { path, title: `Page Not Found | ${SITE_NAME}`, description: PAGE_SEO['/'].description, noindex: true };
  }
  return {
    path,
    title: path === '/' ? page.title : `${page.title} | ${SITE_NAME}`,
    description: page.description || PAGE_SEO['/'].description,
    noindex: Boolean(page.noindex),
  };
}
