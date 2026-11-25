import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import ToursSection from '../components/common/ToursSection';
import { DAY_TRIPS } from '../data/guides';

const DayTrips = () => (
  <div className="min-h-screen bg-gray-50">
    <PageHero
      image="planner"
      title="Day Trips from Cape Town"
      subtitle="Cape Point and the penguins, the Winelands, whale watching in Hermanus and Chapman's Peak"
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
      <nav aria-label="Day trips" className="flex flex-wrap gap-2">
        {DAY_TRIPS.map((trip, i) => (
          <a key={trip.name} href={`#trip-${i}`} className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm font-semibold text-gray-800 hover:border-gray-900">
            {trip.name}
          </a>
        ))}
      </nav>

      {DAY_TRIPS.map((trip, i) => (
        <section key={trip.name} id={`trip-${i}`} className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden md:grid md:grid-cols-5">
            <img src={trip.image} alt="" loading="lazy" className="aspect-[3/2] md:aspect-auto w-full h-full object-cover md:col-span-2" />
            <div className="p-5 sm:p-6 md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900">{trip.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-600"><MapPin className="h-4 w-4" /> {trip.distance}</p>
              <p className="mt-3 text-gray-700 leading-relaxed">{trip.summary}</p>
              {trip.link && (
                <Link to={trip.link} className="mt-4 inline-block font-semibold text-gray-900 underline underline-offset-4">Read the full guide</Link>
              )}
            </div>
          </div>
          <div className="mt-6">
            <ToursSection bare query={trip.tours} count={3} title={`${trip.name}: tours`} subtitle="Prices per person, from." />
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default DayTrips;
