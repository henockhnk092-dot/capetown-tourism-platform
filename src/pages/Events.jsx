import { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, X, Clock, Ticket, CalendarPlus } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const events = [
  {
    id: 1,
    name: "Cape Town International Jazz Festival",
    date: "19-21 March 2027 (main weekend)",
    month: "March",
    startDate: "2027-03-19",
    endDate: "2027-03-21",
    location: "Company's Garden, Greenmarket Square & St George's Cathedral",
    category: "Music",
    price: "Tickets on Quicket",
    description: "Africa's Grandest Gathering, now a month-long city-wide programme (4-26 March 2027) with the main weekend in the city centre.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    fullDescription: `The Cape Town International Jazz Festival is Africa's biggest and most prestigious jazz festival. For 2027 it grows into a month-long "Month of the Mother City" programme from 4 to 26 March, with a homecoming weekend in District Six on 12-13 March and the main festival weekend from 19 to 21 March in the Company's Garden, Greenmarket Square and St George's Cathedral.

**What to Expect:**
• Performances across several venues in the city centre
• Mix of established legends and emerging artists
• Food and beverage vendors
• Art exhibitions and cultural displays

**Past Performers:**
The festival has hosted legends like Herbie Hancock, Chick Corea, Hugh Masekela, and Miriam Makeba, alongside contemporary stars.

**Practical Information:**
• Early bird tickets are sold on Quicket; full pricing is released from mid-November 2026
• Check the official website for the line-up and stage times
• Book accommodation early as hotels fill up quickly`,
    time: "See website for stage times",
    website: "https://www.capetownjazzfest.com"
  },
  {
    id: 2,
    name: "Cape Town Carnival",
    date: "Saturday 20 March 2027",
    month: "March",
    startDate: "2027-03-20",
    endDate: "2027-03-20",
    location: "Green Point Fan Walk",
    category: "Culture",
    price: "Free",
    description: "Spectacular street parade celebrating Cape Town's diversity with music, dance, and colorful costumes.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    website: "https://www.capetowncarnival.com"
  },
  {
    id: 3,
    name: "First Thursdays",
    date: "First Thursday of every month",
    month: "Monthly",
    location: "Various galleries (City Bowl)",
    category: "Art",
    price: "Free",
    description: "Monthly art walk featuring galleries, live music, food trucks, and street performances.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
    website: "https://www.capetown.travel/explore-cape-town/first-thursdays/"
  },
  {
    id: 4,
    name: "Cape Town Cycle Tour",
    date: "Sunday 14 March 2027",
    month: "March",
    startDate: "2027-03-14",
    endDate: "2027-03-14",
    location: "Grand Parade to Sea Point (109 km Peninsula loop)",
    category: "Sports",
    price: "Entry fees on website",
    description: "The world's largest individually timed cycle race: 109 km around the Cape Peninsula.",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    website: "https://www.capetowncycletour.com"
  },
  {
    id: 5,
    name: "Franschhoek Bastille Festival",
    date: "Mid-July 2027 (dates TBC)",
    month: "July",
    location: "Franschhoek",
    category: "Food & Wine",
    price: "See website",
    description: "Celebration of Franschhoek's French heritage with wine, food, and entertainment.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
    website: "https://www.franschhoekbastille.co.za/"
  },
  {
    id: 6,
    name: "Hermanus Whale Festival",
    date: "Late Sept / early Oct 2027 (dates TBC)",
    month: "September",
    location: "Hermanus",
    category: "Nature",
    price: "Free",
    description: "Celebrate whale season with environmental activities, music, and food.",
    image: "/images/hermanus-whale.jpg",
    website: "https://hermanuswhalefestival.co.za/"
  },
  {
    id: 7,
    name: "Kirstenbosch Summer Sunset Concerts",
    date: "Summer season, Nov 2026 - Mar 2027",
    month: "Summer",
    location: "Kirstenbosch Botanical Gardens",
    category: "Music",
    price: "From about R995 for headline shows",
    description: "Iconic outdoor concerts in the beautiful botanical gardens setting.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    website: "https://www.sanbi.org/gardens/kirstenbosch/summer-sunset-concerts/"
  },
  {
    id: 8,
    name: "Cape Town International Kite Festival",
    date: "October 2027 (dates TBC)",
    month: "October",
    location: "Youngsfield Military Base, Ottery",
    category: "Family",
    price: "From R50",
    description: "Africa's biggest kite festival, raising funds for Cape Mental Health. Held on 24-25 October in 2026.",
    image: "/images/kite-surfing.jpg",
    website: "https://www.capetown.travel/events/"
  }
];

// Download an all-day .ics calendar entry for events with confirmed dates
const downloadCalendarFile = (event) => {
  const toIcsDate = (iso) => iso.replace(/-/g, '');
  // DTEND is exclusive for all-day events, so add one day
  const end = new Date(`${event.endDate}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 1);
  const escape = (text) => text.replace(/[,;\\]/g, (c) => `\\${c}`);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HNK IoT Solutions//Cape Town Tourism Platform//EN',
    'BEGIN:VEVENT',
    `UID:event-${event.id}-${event.startDate}@capetownplanner.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;VALUE=DATE:${toIcsDate(event.startDate)}`,
    `DTEND;VALUE=DATE:${end.toISOString().slice(0, 10).replace(/-/g, '')}`,
    `SUMMARY:${escape(event.name)}`,
    `LOCATION:${escape(event.location)}`,
    `DESCRIPTION:${escape(event.description)} ${event.website || ''}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`;
  link.click();
  URL.revokeObjectURL(url);
};

const categories = ["All", "Music", "Culture", "Art", "Sports", "Food & Wine", "Nature", "Family"];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter((event) =>
    selectedCategory === 'All' || event.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        image="events"
        title="Events & Festivals"
        subtitle="Discover what's happening in Cape Town throughout the year"
      />

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-8">
          Showing {filteredEvents.length} of {events.length} events
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-100 relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.category}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                    {event.month}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {event.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {event.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {event.price}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="mt-4 w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Guide */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Calendar by Season</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Summer (Dec-Feb)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Kirstenbosch Summer Concerts</li>
                <li>• Beach festivals & events</li>
                <li>• New Year celebrations</li>
                <li>• Outdoor markets peak</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Autumn (Mar-May)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Cape Town Jazz Festival</li>
                <li>• Cape Town Carnival</li>
                <li>• Cycle Tour</li>
                <li>• Wine harvest festivals</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Winter (Jun-Aug)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Good Food & Wine Show</li>
                <li>• Whale season begins</li>
                <li>• Indoor events & markets</li>
                <li>• Art exhibitions</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Spring (Sep-Nov)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Hermanus Whale Festival</li>
                <li>• Wildflower season</li>
                <li>• Kite Festival</li>
                <li>• Spring markets</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gray-100 border border-gray-200 rounded-lg p-8">
          <div className="flex items-start">
            <Users className="h-6 w-6 mr-3 text-gray-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Event Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Book tickets early for major events as they often sell out</li>
                <li>• Check event websites for updated dates and times</li>
                <li>• Consider accommodation well in advance for popular events</li>
                <li>• Many events offer early-bird discounts</li>
                <li>• Follow event social media pages for last-minute updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div
              className="bg-white rounded-lg max-w-4xl w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Sticky */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="sticky top-4 float-right mr-4 mt-4 p-2 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors z-20 shadow-lg"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8 clear-both">
                {/* Image */}
                <div className="h-48 sm:h-56 md:h-64 bg-gray-100 relative rounded-lg overflow-hidden mb-4 sm:mb-6">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    {selectedEvent.category}
                  </div>
                </div>

                {/* Event Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  {selectedEvent.name}
                </h1>

                {/* Event Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Date</p>
                      <p className="text-sm sm:text-base font-semibold">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Time</p>
                      <p className="text-sm sm:text-base font-semibold">{selectedEvent.time || 'See website for details'}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Location</p>
                      <p className="text-sm sm:text-base font-semibold">{selectedEvent.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Price</p>
                      <p className="text-sm sm:text-base font-semibold">{selectedEvent.price}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">About This Event</h2>
                  {selectedEvent.fullDescription ? (
                    <div
                      className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: selectedEvent.fullDescription
                          .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
                          .replace(/\n\n/g, '</p><p class="mb-3 sm:mb-4">')
                      }}
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                  {selectedEvent.website ? (
                    <a
                      href={selectedEvent.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
                    >
                      <Ticket className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      {selectedEvent.price === "Free" ? "Event Details" : "Book Tickets"}
                    </a>
                  ) : null}
                  {selectedEvent.startDate && (
                    <button
                      onClick={() => downloadCalendarFile(selectedEvent)}
                      className="flex-1 inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      <CalendarPlus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Add to Calendar
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
