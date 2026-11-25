import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, ExternalLink, Lightbulb, MapPin, Navigation, Sun } from 'lucide-react';
import { PLACES } from '../data/guides';
import ToursSection from '../components/common/ToursSection';

const Fact = ({ Icon, label, value }) => (
  <div className="flex gap-3">
    <Icon className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-900">{value}</dd>
    </div>
  </div>
);

const AttractionDetail = () => {
  const { slug } = useParams();
  const place = PLACES.find((p) => p.slug === slug);

  if (!place) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Attraction not found</h1>
        <Link to="/attractions" className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">See all attractions</Link>
      </div>
    );
  }

  const others = PLACES.filter((p) => p.slug !== place.slug);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative isolate overflow-hidden bg-gray-900 text-white">
        <img src={place.image} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-950/80 via-gray-900/50 to-gray-900/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-300 mb-4">
            <Link to="/" className="hover:text-white">Home</Link> <span aria-hidden="true">/</span>{' '}
            <Link to="/attractions" className="hover:text-white">Attractions</Link> <span aria-hidden="true">/</span>{' '}
            <span className="text-white">{place.name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">{place.name}</h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">{place.tagline}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">About {place.name}</h2>
              <p className="text-gray-700 leading-relaxed">{place.summary}</p>
              <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-900">Highlights</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {place.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" /> {h}</li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Tips before you go</h2>
              <ul className="space-y-3">
                {place.tips.map((t) => (
                  <li key={t} className="flex gap-3 text-gray-700"><Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" /> {t}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Plan your visit</h2>
              <dl className="space-y-4">
                <Fact Icon={Clock} label="Time needed" value={place.duration} />
                <Fact Icon={Sun} label="Best time" value={place.bestTime} />
                <Fact Icon={Navigation} label="Getting there" value={place.gettingThere} />
              </dl>
              <div className="mt-5 flex flex-col gap-2">
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">
                  <MapPin className="h-4 w-4" /> Open in Google Maps
                </a>
                <a href={place.official.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:border-gray-900">
                  {place.official.label} <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-3 text-xs text-gray-500">Opening hours and prices change: check the official site before you go.</p>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Plan the rest of your trip</h2>
              <ul className="space-y-2 text-gray-900 font-medium">
                <li><Link to="/where-to-stay" className="underline underline-offset-4">Where to stay in Cape Town</Link></li>
                <li><Link to="/day-trips" className="underline underline-offset-4">Day trips from Cape Town</Link></li>
                <li><Link to="/planner" className="underline underline-offset-4">Build your itinerary</Link></li>
              </ul>
            </section>
          </aside>
        </div>

        <div className="mt-10">
          <ToursSection key={place.slug} bare query={place.tours} count={6} title={`${place.name} tours and tickets`} />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">More Cape Town attractions</h2>
          <ul className="grid gap-4 grid-cols-2 lg:grid-cols-5">
            {others.map((p) => (
              <li key={p.slug}>
                <Link to={`/attractions/${p.slug}`} className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-900">
                  <img src={p.image} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
                  <span className="block p-3 font-semibold text-gray-900 group-hover:underline">{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Link to="/attractions" className="mt-10 inline-flex items-center gap-2 font-semibold text-gray-900 underline underline-offset-4">
          <ArrowLeft className="h-4 w-4" /> All attractions
        </Link>
      </div>
    </div>
  );
};

export default AttractionDetail;
