// Affiliate partners. These IDs are public (they appear in the links visitors click);
// the private API tokens live in Cloudflare secrets and are only used in functions/.

const AVIASALES_MARKER = '811196';
const DISCOVERCARS_ID = 'HenockHnk';

export const STAY22_MAP_URL = 'https://www.stay22.com/embed/6b05d64317dae08eb3fa36e3';

export const CAR_HIRE_URL = `https://www.discovercars.com/?a_aid=${DISCOVERCARS_ID}`;

// Viator asks partners not to change the tracking part of the link
export const TOURS_URL = 'https://www.viator.com/Cape-Town/d318-ttd?pid=P00333785&mcid=42383&medium=link';

// Aviasales search address: JNB1012CPT17121 = 10 Dec out, 17 Dec back, 1 passenger
const dayMonth = (date) => date.slice(8, 10) + date.slice(5, 7);
export const flightSearchUrl = ({ from, depart, back, passengers = 1 }) =>
  `https://www.aviasales.com/search/${from}${dayMonth(depart)}CPT${back ? dayMonth(back) : ''}${passengers}?marker=${AVIASALES_MARKER}`;

export const fareUrl = (path) =>
  `https://www.aviasales.com${path}${path.includes('?') ? '&' : '?'}marker=${AVIASALES_MARKER}`;

export const AIRPORTS = [
  { code: 'JNB', name: 'Johannesburg' },
  { code: 'DUR', name: 'Durban' },
  { code: 'LON', name: 'London' },
  { code: 'AMS', name: 'Amsterdam' },
  { code: 'FRA', name: 'Frankfurt' },
  { code: 'PAR', name: 'Paris' },
  { code: 'DXB', name: 'Dubai' },
  { code: 'NYC', name: 'New York' },
  { code: 'FIH', name: 'Kinshasa' },
  { code: 'NBO', name: 'Nairobi' },
  { code: 'LOS', name: 'Lagos' },
  { code: 'WDH', name: 'Windhoek' },
];
