// Application Constants

// Business behind the platform
export const BUSINESS = {
  name: 'HNK IoT Solutions',
  legalName: 'HNK IoT Solutions (Pty) Ltd',
  founder: 'Henock Mukonkole',
  website: 'https://hnkiot.com',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'henock@hnkiot.com',
  phone: '+27 61 471 9400',
  whatsapp: 'https://wa.me/27614719400',
  location: 'Cape Town, South Africa',
  googleProfile: 'https://share.google/mV4jaHSgMtdWRzfKi'
};

// Social Media Links (HNK IoT Solutions)
export const SOCIAL_MEDIA = {
  email: BUSINESS.email,
  linkedin: 'https://www.linkedin.com/in/hnk-iot-solutions/',
  github: 'https://github.com/hnkiot',
  youtube: 'https://www.youtube.com/@HNKIoTSolutions',
  facebook: 'https://www.facebook.com/HnkIoTSolutions',
  instagram: 'https://www.instagram.com/hnkiotsolutions/',
  x: 'https://x.com/HnkIotSolutions',
  tiktok: 'https://www.tiktok.com/@hnkiot',
  sourceRepo: import.meta.env.VITE_GITHUB_REPO || 'https://github.com/henockhnk092-dot/capetown-tourism-platform'
};

// Social links in display order, used by the footer, About and Contact pages
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', handle: 'HNK IoT Solutions', url: SOCIAL_MEDIA.linkedin },
  { name: 'YouTube', handle: '@HNKIoTSolutions', url: SOCIAL_MEDIA.youtube },
  { name: 'Facebook', handle: 'HnkIoTSolutions', url: SOCIAL_MEDIA.facebook },
  { name: 'Instagram', handle: '@hnkiotsolutions', url: SOCIAL_MEDIA.instagram },
  { name: 'X', handle: '@HnkIotSolutions', url: SOCIAL_MEDIA.x },
  { name: 'TikTok', handle: '@hnkiot', url: SOCIAL_MEDIA.tiktok },
  { name: 'GitHub', handle: 'hnkiot', url: SOCIAL_MEDIA.github }
];

// Credits for Wikimedia Commons photos hosted in /public/images (required by CC BY-SA)
export const IMAGE_CREDITS = [
  { subject: 'Robben Island', author: 'Moheen Reeyad', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Maximum_Security_Prison,_Robben_Island_(02).jpg' },
  { subject: 'V&A Waterfront', author: 'Dietmar Rabich', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Cape_Town_(ZA),_Waterfront,_Clock_Tower_--_2024_--_3036.jpg' },
  { subject: 'Cape Point', author: 'Diego Delso', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Cape_Point,_Sud%C3%A1frica,_2018-07-23,_DD_105.jpg' },
  { subject: 'Kirstenbosch', author: 'Rainer Halama', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Kirstenbosch_Botanical_Garden-3135.jpg' },
  { subject: 'Kitesurfing in Cape Town', author: 'Anonymous', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Kitesurfing_in_Capetown.jpg' },
  { subject: 'Southern right whale, Hermanus', author: 'Josep M. Gracia', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:HER_-_Breaching_southern_right_whale_near_Hermanus,_South_Africa,_2017.jpg' }
];

// Color Palette (Cape Town Theme)
export const COLORS = {
  // Primary Colors - Ocean & Sky
  primaryBlue: '#0077BE',
  lightBlue: '#00A3E0',
  skyBlue: '#87CEEB',

  // Secondary Colors - Table Mountain & Earth
  mountainGrey: '#5F6368',
  earthBrown: '#8B7355',
  sandBeige: '#D4A574',

  // Accent Colors - African Sunset
  sunsetOrange: '#FF6B35',
  warmOrange: '#FFA500',
  coral: '#FF7F50',

  // Semantic Colors
  success: '#34A853',
  warning: '#FBBC04',
  error: '#EA4335',
  info: '#4285F4'
};

// Attraction Categories
export const ATTRACTION_CATEGORIES = [
  { id: 'nature', name: 'Natural Wonders', icon: '🏔️', color: 'green' },
  { id: 'history', name: 'Historical Sites', icon: '🏛️', color: 'brown' },
  { id: 'culture', name: 'Arts & Culture', icon: '🎭', color: 'purple' },
  { id: 'food', name: 'Food & Wine', icon: '🍷', color: 'red' },
  { id: 'adventure', name: 'Adventure & Sports', icon: '🏄', color: 'blue' },
  { id: 'shopping', name: 'Shopping & Markets', icon: '🛍️', color: 'pink' },
  { id: 'nightlife', name: 'Nightlife & Entertainment', icon: '🎵', color: 'indigo' },
  { id: 'family', name: 'Family-Friendly', icon: '👨‍👩‍👧‍👦', color: 'yellow' }
];

// Price Ranges
export const PRICE_RANGES = [
  { id: 'free', label: 'Free', symbol: '💰', min: 0, max: 0 },
  { id: 'budget', label: 'Budget', symbol: '💰💰', min: 1, max: 200 },
  { id: 'midrange', label: 'Mid-range', symbol: '💰💰💰', min: 201, max: 500 },
  { id: 'luxury', label: 'Luxury', symbol: '💰💰💰💰', min: 501, max: Infinity }
];

// Emergency Contacts
export const EMERGENCY_CONTACTS = {
  police: '10111',
  ambulance: '10177',
  fire: '021 535 1100',
  touristPolice: '021 418 2852',
  emergencyServices: '112'
};

// Essential Information
export const ESSENTIAL_INFO = {
  currency: 'South African Rand (ZAR)',
  timezone: 'South Africa Standard Time (SAST) - UTC+2',
  languages: ['English', 'Afrikaans', 'Xhosa', 'and 8 others'],
  powerOutlets: 'Type M (15A, 230V)',
  drivingSide: 'Left',
  emergencyNumber: '112'
};

// Seasons
export const SEASONS = [
  {
    name: 'Summer',
    months: ['December', 'January', 'February'],
    temp: '18-28°C',
    description: 'Warm and dry, perfect for beaches',
    crowdLevel: 'High'
  },
  {
    name: 'Autumn',
    months: ['March', 'April', 'May'],
    temp: '12-22°C',
    description: 'Mild weather, wine harvest season',
    crowdLevel: 'Medium'
  },
  {
    name: 'Winter',
    months: ['June', 'July', 'August'],
    temp: '7-18°C',
    description: 'Cooler with some rain, whale watching season',
    crowdLevel: 'Low'
  },
  {
    name: 'Spring',
    months: ['September', 'October', 'November'],
    temp: '11-23°C',
    description: 'Beautiful flowers, pleasant weather',
    crowdLevel: 'Medium'
  }
];

// Featured Attractions (Initial Data)
export const FEATURED_ATTRACTIONS = [
  {
    id: 1,
    name: 'Table Mountain',
    category: 'nature',
    rating: 4.8,
    reviewCount: 15420,
    priceRange: 'midrange',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
    description: 'Iconic flat-topped mountain with cable car access and stunning views',
    location: 'Table Mountain National Park',
    duration: '3-4 hours',
    coordinates: { lat: -33.9628, lng: 18.4098 }
  },
  {
    id: 2,
    name: 'Robben Island',
    category: 'history',
    rating: 4.6,
    reviewCount: 8932,
    priceRange: 'midrange',
    image: '/images/robben-island.jpg',
    description: 'Historic island prison where Nelson Mandela was held',
    location: 'Table Bay',
    duration: '3.5 hours',
    coordinates: { lat: -33.8070, lng: 18.3699 }
  },
  {
    id: 3,
    name: 'V&A Waterfront',
    category: 'shopping',
    rating: 4.5,
    reviewCount: 12500,
    priceRange: 'free',
    image: '/images/va-waterfront.jpg',
    description: 'Vibrant harbor area with shopping, dining, and entertainment',
    location: 'Victoria & Alfred Waterfront',
    duration: '2-3 hours',
    coordinates: { lat: -33.9040, lng: 18.4190 }
  },
  {
    id: 4,
    name: 'Cape Point',
    category: 'nature',
    rating: 4.7,
    reviewCount: 9876,
    priceRange: 'budget',
    image: '/images/cape-point.jpg',
    description: 'Dramatic clifftop location where two oceans meet',
    location: 'Cape of Good Hope',
    duration: 'Full day',
    coordinates: { lat: -34.3569, lng: 18.4974 }
  },
  {
    id: 5,
    name: 'Kirstenbosch Gardens',
    category: 'nature',
    rating: 4.9,
    reviewCount: 7234,
    priceRange: 'budget',
    image: '/images/kirstenbosch.jpg',
    description: 'World-renowned botanical garden against Table Mountain',
    location: 'Newlands',
    duration: '2-3 hours',
    coordinates: { lat: -33.9882, lng: 18.4320 }
  },
  {
    id: 6,
    name: 'Cape Winelands',
    category: 'food',
    rating: 4.8,
    reviewCount: 11200,
    priceRange: 'midrange',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800',
    description: 'Stunning vineyards with world-class wine tasting',
    location: 'Stellenbosch & Franschhoek',
    duration: 'Full day',
    coordinates: { lat: -33.9321, lng: 18.8602 }
  }
];

// Navigation Menu Items
export const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Attractions', path: '/attractions', icon: '🗺️' },
  { name: 'Accommodation', path: '/accommodation', icon: '🏨' },
  { name: 'AI Assistant', path: '/ai-assistant', icon: '🤖' },
  { name: 'Itinerary Planner', path: '/planner', icon: '📝' },
  { name: 'Blog', path: '/blog', icon: '📰' },
  { name: 'Transportation', path: '/transportation', icon: '🚌' },
  { name: 'Safety Tips', path: '/safety', icon: '🛡️' },
  { name: 'Events Calendar', path: '/events', icon: '🎉' },
  { name: 'Resources', path: '/resources', icon: '📚' },
  { name: 'About', path: '/about', icon: 'ℹ️' },
  { name: 'Contact', path: '/contact', icon: '📧' }
];

// Header menu: the same groups are used on desktop (dropdowns) and mobile (sections)
const navItem = (path) => NAV_ITEMS.find((item) => item.path === path);
export const NAV_GROUPS = [
  { name: 'Home', path: '/' },
  {
    name: 'Explore',
    items: ['/attractions', '/accommodation', '/events', '/blog'].map(navItem),
  },
  {
    name: 'Plan',
    items: ['/ai-assistant', '/planner', '/transportation'].map(navItem),
  },
  {
    name: 'Travel Info',
    items: ['/safety', '/resources', '/about'].map(navItem),
  },
  { name: 'Contact', path: '/contact' },
];

// API Endpoints
export const API_ENDPOINTS = {
  formspree: import.meta.env.VITE_FORMSPREE_ENDPOINT
};

export default {
  BUSINESS,
  SOCIAL_MEDIA,
  SOCIAL_LINKS,
  IMAGE_CREDITS,
  COLORS,
  ATTRACTION_CATEGORIES,
  PRICE_RANGES,
  EMERGENCY_CONTACTS,
  ESSENTIAL_INFO,
  SEASONS,
  FEATURED_ATTRACTIONS,
  NAV_ITEMS,
  API_ENDPOINTS
};
