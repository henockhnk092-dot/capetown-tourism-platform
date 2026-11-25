// Travel guide content: attraction pages, areas to stay, day trips, airport, best time and FAQ.
// Plain data only: also imported by Node at build time (page titles, sitemap, share images, search data).
// Prices and times change, so the text points visitors to official sites for current details.

export const PLACES = [
  {
    id: 1,
    slug: 'table-mountain',
    name: 'Table Mountain',
    image: '/images/heroes/attractions.jpg',
    tagline: 'The flat-topped mountain above the city, by cable car or on foot.',
    summary:
      'Table Mountain rises about 1,085 m above Cape Town and is part of Table Mountain National Park. The rotating cable car takes about five minutes to the top, where easy paths lead to viewpoints over the city, Robben Island and the Twelve Apostles.',
    highlights: [
      'Rotating cable car from the lower station on Tafelberg Road',
      'Short circular walks and viewpoints on the summit plateau',
      'Hiking routes such as Platteklip Gorge (steep, about 2 to 3 hours up)',
      'Sunset views over the Atlantic Seaboard',
    ],
    tips: [
      'The cable car closes in strong wind or thick cloud. Check its status on the day before you go.',
      'Go early in the morning in summer to avoid the longest queues, or book tickets online.',
      'Take water, sunscreen and a warm layer: it is often much cooler and windier on top.',
      'Hike with others, start early and tell someone your route. Do not hike down in the dark.',
    ],
    gettingThere: 'About 10 minutes by car or ride-hailing from the city centre. The MyCiTi bus also stops near the lower cable station.',
    duration: '3 to 4 hours',
    bestTime: 'Clear, calm mornings, especially from October to April',
    official: { label: 'Table Mountain Aerial Cableway', url: 'https://www.tablemountain.net/' },
    tours: 'Table Mountain',
    coordinates: { lat: -33.9628, lng: 18.4098 },
  },
  {
    id: 2,
    slug: 'robben-island',
    name: 'Robben Island',
    image: '/images/robben-island.jpg',
    tagline: 'The island prison where Nelson Mandela was held for 18 years.',
    summary:
      'Robben Island is a UNESCO World Heritage Site in Table Bay. Tours leave by ferry from the Nelson Mandela Gateway at the V&A Waterfront and include a bus tour of the island and a visit to the maximum security prison, often guided by former political prisoners.',
    highlights: [
      "Nelson Mandela's prison cell",
      'Guided tour of the maximum security prison',
      'The lime quarry where prisoners worked',
      'Views of Table Mountain from across the bay',
    ],
    tips: [
      'Book ahead, especially in summer: tours often sell out.',
      'Ferries are cancelled in rough seas. Check the day before.',
      'Arrive at the Nelson Mandela Gateway at least 20 minutes before departure.',
      'Bring motion-sickness tablets if you get seasick.',
    ],
    gettingThere: 'Ferries leave from the Nelson Mandela Gateway at the V&A Waterfront.',
    duration: 'About 3.5 hours, including the ferry',
    bestTime: 'Morning departures in calm weather',
    official: { label: 'Robben Island Museum', url: 'https://www.robben-island.org.za/' },
    tours: 'Robben Island',
    coordinates: { lat: -33.807, lng: 18.3699 },
  },
  {
    id: 3,
    slug: 'va-waterfront',
    name: 'V&A Waterfront',
    image: '/images/va-waterfront.jpg',
    tagline: 'Working harbour, shops, restaurants and museums in one walkable area.',
    summary:
      'The Victoria & Alfred Waterfront is a working harbour with hotels, restaurants, markets and shops. It is also the starting point for Robben Island ferries, harbour cruises and helicopter flights, and home to the Zeitz MOCAA art museum and the Two Oceans Aquarium.',
    highlights: [
      'Zeitz MOCAA, a museum of contemporary African art',
      'Two Oceans Aquarium',
      'The Watershed craft and design market',
      'Harbour cruises and sunset boat trips',
    ],
    tips: [
      'It is one of the easiest areas to walk around, day and evening.',
      'Book sunset cruises a day or two ahead in summer.',
      'Parking is available in several garages; ride-hailing drop-off points are well signposted.',
    ],
    gettingThere: 'About 5 minutes by car from the city centre, or by MyCiTi bus.',
    duration: '2 to 4 hours, or a full day with a museum and a cruise',
    bestTime: 'Any day; late afternoon for sunset views',
    official: { label: 'V&A Waterfront', url: 'https://www.waterfront.co.za/' },
    tours: 'V&A Waterfront cruise',
    coordinates: { lat: -33.904, lng: 18.419 },
  },
  {
    id: 4,
    slug: 'cape-point',
    name: 'Cape Point',
    image: '/images/cape-point.jpg',
    tagline: 'Cliffs, lighthouses and wild coastline at the tip of the peninsula.',
    summary:
      'Cape Point and the Cape of Good Hope are in the southern section of Table Mountain National Park. A funicular or a short steep walk leads to the old lighthouse, with views over False Bay and the Atlantic. Most visitors combine it with the penguins at Boulders Beach.',
    highlights: [
      'The Flying Dutchman funicular and the old lighthouse',
      'The Cape of Good Hope sign and coastal walks',
      'Ostriches, bontebok and fynbos in the reserve',
      'Boulders Beach penguins on the way, in Simon’s Town',
    ],
    tips: [
      'Do not feed or carry food openly near baboons; keep car windows closed.',
      'It is very windy: bring a jacket even on sunny days.',
      'Drive one way via Chapman’s Peak and back via Simon’s Town for a full loop.',
      'There is a park entry fee; check current conservation fees before you go.',
    ],
    gettingThere: 'About 1 to 1.5 hours by car from the city centre. Many day tours include it.',
    duration: 'Full day with Boulders Beach',
    bestTime: 'Calm, clear days; arrive early to beat tour buses',
    official: { label: 'SANParks: Table Mountain National Park', url: 'https://www.sanparks.org/parks/table-mountain' },
    tours: 'Cape Point',
    coordinates: { lat: -34.3569, lng: 18.4974 },
  },
  {
    id: 5,
    slug: 'kirstenbosch',
    name: 'Kirstenbosch Gardens',
    image: '/images/kirstenbosch.jpg',
    tagline: "Botanical garden on the slopes of Table Mountain, home to South Africa's fynbos.",
    summary:
      "Kirstenbosch National Botanical Garden grows plants from across Southern Africa against the eastern slopes of Table Mountain. Highlights include the Boomslang tree canopy walkway, the protea gardens and, in summer, the Sunday sunset concerts.",
    highlights: [
      'The Boomslang canopy walkway through the treetops',
      'Protea and fynbos gardens',
      'Summer sunset concerts on the lawns',
      'The Skeleton Gorge trail up Table Mountain (for fit hikers)',
    ],
    tips: [
      'Bring a picnic: picnics are allowed on the lawns.',
      'Concert tickets sell out, so book ahead in summer.',
      'Spring (August to October) has the most flowers.',
    ],
    gettingThere: 'About 20 minutes by car from the city centre, in Newlands.',
    duration: '2 to 3 hours',
    bestTime: 'Spring for flowers; summer evenings for concerts',
    official: { label: 'SANBI: Kirstenbosch', url: 'https://www.sanbi.org/gardens/kirstenbosch/' },
    tours: 'Kirstenbosch',
    coordinates: { lat: -33.9882, lng: 18.432 },
  },
  {
    id: 6,
    slug: 'cape-winelands',
    name: 'Cape Winelands',
    image: '/images/winelands.jpg',
    tagline: 'Wine farms, mountains and food in Stellenbosch, Franschhoek and Paarl.',
    summary:
      'The Cape Winelands are under an hour from Cape Town. Stellenbosch has a historic university town centre and dozens of wine farms; Franschhoek is known for its restaurants and the hop-on hop-off Wine Tram; Paarl has larger estates against granite mountains.',
    highlights: [
      'Wine tastings with mountain views',
      'The Franschhoek Wine Tram',
      'Historic Stellenbosch town centre',
      'Cellar tours and food and wine pairings',
    ],
    tips: [
      "Don't drink and drive: take a tour, the Wine Tram or a driver.",
      'Many farms ask you to book tastings, especially on weekends.',
      'Harvest season is from February to April.',
    ],
    gettingThere: 'Stellenbosch is about 50 minutes and Franschhoek about 1 hour 15 minutes by car from Cape Town.',
    duration: 'Full day',
    bestTime: 'All year; February to April for the harvest',
    official: { label: 'Visit Stellenbosch', url: 'https://www.visitstellenbosch.org.za/' },
    tours: 'Stellenbosch Franschhoek wine',
    coordinates: { lat: -33.9321, lng: 18.8602 },
  },
];

export const placeById = (id) => PLACES.find((p) => p.id === id);

export const AREAS = [
  {
    name: 'City Bowl',
    image: '/images/heroes/blog.jpg',
    bestFor: 'First visits, restaurants, nightlife and museums',
    summary: 'The city centre and the suburbs below Table Mountain, including Bo-Kaap, Gardens and Tamboerskloof. Close to everything, with many guesthouses and boutique hotels.',
    pros: ['Central for most sights', 'Many restaurants and bars on Bree and Kloof Streets', 'Wide range of prices'],
    cons: ['Busy and noisy in places', 'Take ride-hailing at night rather than walking'],
  },
  {
    name: 'V&A Waterfront and De Waterkant',
    image: '/images/va-waterfront.jpg',
    bestFor: 'Families, first visits and walking',
    summary: 'Large hotels at the harbour, with shops, restaurants and the Robben Island ferry on the doorstep. De Waterkant next door has stylish apartments.',
    pros: ['Easy to walk around day and evening', 'Robben Island ferries and cruises', 'Many dining options'],
    cons: ['Among the most expensive areas', 'Tourist-focused'],
  },
  {
    name: 'Sea Point and Green Point',
    image: '/images/heroes/transportation.jpg',
    bestFor: 'Ocean views, running and good value',
    summary: 'Apartments and hotels along the Sea Point Promenade, a few minutes from the Waterfront and the city.',
    pros: ['Sea views and the promenade', 'Good value apartments', 'MyCiTi bus to town'],
    cons: ['Swimming is limited to the pavilion pool and small beaches', 'Main road can be busy'],
  },
  {
    name: 'Camps Bay and Clifton',
    image: '/images/heroes/safety.jpg',
    bestFor: 'Beaches, sunsets and luxury',
    summary: 'White beaches below the Twelve Apostles, with villas, boutique hotels and beach restaurants.',
    pros: ['The famous beaches', 'Sunset views', 'Upmarket stays'],
    cons: ['Expensive in summer', 'Cold Atlantic water', 'You need a car or ride-hailing for most sights'],
  },
  {
    name: 'Southern Suburbs and Constantia',
    image: '/images/kirstenbosch.jpg',
    bestFor: 'Quiet stays, gardens and wine',
    summary: 'Leafy suburbs such as Newlands and Constantia, near Kirstenbosch and the Constantia wine route.',
    pros: ['Quieter and greener', 'Near Kirstenbosch and wine farms', 'Good for Cape Point trips'],
    cons: ['You need a car or ride-hailing', 'Further from the beaches on the Atlantic side'],
  },
  {
    name: 'Stellenbosch and Franschhoek',
    image: '/images/winelands.jpg',
    bestFor: 'Wine, food and a slower pace',
    summary: 'Stay on a wine farm or in a historic town about an hour from Cape Town.',
    pros: ['Wine farms and top restaurants', 'Mountain scenery', 'Guesthouses on farms'],
    cons: ['About an hour from Cape Town', 'A car or tour is needed to get around'],
  },
];

export const DAY_TRIPS = [
  {
    name: 'Cape Peninsula and the penguins',
    image: '/images/cape-point.jpg',
    distance: 'About 70 km; full day',
    summary: "Drive along Chapman's Peak, see the African penguins at Boulders Beach in Simon's Town, then walk up to the Cape Point lighthouse.",
    tours: 'Cape Point penguins',
    link: '/attractions/cape-point',
  },
  {
    name: 'Winelands: Stellenbosch and Franschhoek',
    image: '/images/winelands.jpg',
    distance: 'About 50 to 75 km; full day',
    summary: 'Wine tastings, historic towns and mountain views. Take a tour or the Wine Tram so nobody has to drive.',
    tours: 'Stellenbosch Franschhoek wine',
    link: '/attractions/cape-winelands',
  },
  {
    name: 'Hermanus whale watching',
    image: '/images/hermanus-whale.jpg',
    distance: 'About 120 km; full day',
    summary: 'Southern right whales come close to the shore from about June to November. Watch from the cliff path or take a boat trip.',
    tours: 'Hermanus whale',
  },
  {
    name: "Chapman's Peak and Hout Bay",
    image: '/images/heroes/planner.jpg',
    distance: 'About 25 km; half day',
    summary: "One of the world's great coastal drives, with seal trips and fish and chips in Hout Bay. Check that the toll road is open before you go.",
    tours: 'Hout Bay',
  },
];

export const AIRPORT = {
  intro:
    'Cape Town International Airport (CPT) is about 20 km east of the city centre: around 20 to 30 minutes by car, longer in peak traffic.',
  sections: [
    {
      title: 'Getting to the city',
      items: [
        'Ride-hailing (Uber and Bolt) has signposted pick-up points outside arrivals.',
        'Metered taxis and pre-booked transfers wait outside the terminal.',
        'The MyCiTi airport bus runs to the city centre; check the current timetable before you travel.',
        'Car hire desks are in the parking area across from the terminals.',
      ],
    },
    {
      title: 'Phone and internet',
      items: [
        'Mobile networks have shops in arrivals. You need your passport to register a SIM card (RICA).',
        'An eSIM bought before you fly lets you use data as soon as you land.',
        'Free Wi-Fi is available in the terminal.',
      ],
    },
    {
      title: 'Money',
      items: [
        'The currency is the South African rand (ZAR).',
        'Cards are widely accepted; ATMs are in arrivals. Exchange counters usually give worse rates than ATMs.',
        'Tell your bank you are travelling so your card is not blocked.',
      ],
    },
    {
      title: 'Driving',
      items: [
        'South Africa drives on the left.',
        'Bring your licence; if it is not in English, also bring an International Driving Permit.',
        'Use the main highways (N2 to the city) and avoid stopping on the road shoulder.',
      ],
    },
  ],
};

// Typical figures; weather varies from year to year
export const MONTHS = [
  { month: 'January', high: 26, rain: 'Dry', note: 'Peak summer, busiest and most expensive. Beach weather and strong south-easterly wind.' },
  { month: 'February', high: 27, rain: 'Dry', note: 'Hot and dry, warmest sea. Wine harvest begins.' },
  { month: 'March', high: 25, rain: 'Mostly dry', note: 'Warm days, calmer wind and fewer crowds. Cape Town Cycle Tour and jazz festival season.' },
  { month: 'April', high: 23, rain: 'Some rain', note: 'Mild autumn weather, school holidays around Easter.' },
  { month: 'May', high: 20, rain: 'Rainy', note: 'Quiet and good value. First winter rain.' },
  { month: 'June', high: 18, rain: 'Wettest', note: 'Cool and rainy, low prices. Whales start arriving in Hermanus.' },
  { month: 'July', high: 18, rain: 'Wet', note: 'Mid-winter: cosy wine farms, sunny days between cold fronts.' },
  { month: 'August', high: 18, rain: 'Wet', note: 'Spring flowers begin on the West Coast. Good whale watching.' },
  { month: 'September', high: 19, rain: 'Some rain', note: 'Flowers and whales, and the Hermanus Whale Festival.' },
  { month: 'October', high: 21, rain: 'Mostly dry', note: 'Warm, green and less crowded: one of the best months.' },
  { month: 'November', high: 24, rain: 'Dry', note: 'Early summer before the holiday rush. Good hiking weather.' },
  { month: 'December', high: 25, rain: 'Dry', note: 'Summer holidays start mid-month; book stays and cars early.' },
];

export const FAQS = [
  {
    q: 'Do I need a visa to visit South Africa?',
    a: 'Many nationalities, including UK, EU, US and Canadian passport holders, can visit for up to 90 days without a visa. Rules differ by country and change, so check with the Department of Home Affairs or your nearest South African embassy before you book.',
  },
  {
    q: 'Is Cape Town safe for tourists?',
    a: 'Most visits are trouble-free if you take normal precautions: use ride-hailing at night, keep valuables out of sight, hike in groups and stay in busy areas. Our safety page has more tips and emergency numbers.',
  },
  {
    q: 'What is the best time to visit Cape Town?',
    a: 'October to April has the warmest, driest weather. February and March are warm with fewer crowds than December and January. Winter (June to August) is rainy but quiet and good value, and is whale season.',
  },
  {
    q: 'What currency is used, and are cards accepted?',
    a: 'The currency is the South African rand (ZAR). Cards are accepted almost everywhere, including most taxis booked through apps. ATMs are widely available.',
  },
  {
    q: 'How much should I tip?',
    a: 'About 10 to 15 percent in restaurants, unless a service charge is included. Car guards and petrol attendants usually get a few rand to R20.',
  },
  {
    q: 'Can I drink the tap water?',
    a: 'Yes, tap water in Cape Town is safe to drink.',
  },
  {
    q: 'What plugs are used?',
    a: 'Mostly Type M (three large round pins), with some Type C and N sockets. The voltage is 230 V. Bring an adapter.',
  },
  {
    q: 'What is load-shedding?',
    a: 'Load-shedding means scheduled power cuts when the national grid is under strain. It has been much less frequent recently. Hotels and many restaurants have backup power, and apps such as EskomSePush show schedules.',
  },
  {
    q: 'How do I get around Cape Town?',
    a: 'Ride-hailing (Uber and Bolt) is the easiest option. The MyCiTi bus covers the city, the Atlantic Seaboard and the airport. Hire a car for Cape Point, the Winelands and day trips.',
  },
  {
    q: 'What are the emergency numbers?',
    a: 'Call 112 from a mobile phone, 10111 for the police and 10177 for an ambulance. For mountain rescue, call 021 937 0300.',
  },
];
