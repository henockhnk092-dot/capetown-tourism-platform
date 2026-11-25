import { Link } from 'react-router-dom';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import StayMap from '../components/common/StayMap';
import { AREAS } from '../data/guides';

const WhereToStay = () => (
  <div className="min-h-screen bg-gray-50">
    <PageHero
      image="accommodation"
      title="Where to Stay in Cape Town"
      subtitle="The best areas for first visits, beaches, nightlife, families and wine, with the pros and cons of each"
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <p className="max-w-3xl text-gray-700 leading-relaxed mb-8">
        For a first visit, stay in the City Bowl, at the V&amp;A Waterfront or in Sea Point: they are central, with easy
        ride-hailing and bus links. Choose Camps Bay for beaches, and the Winelands for a slower, food-and-wine stay.
      </p>

      <ul className="grid gap-6 md:grid-cols-2">
        {AREAS.map((area) => (
          <li key={area.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <img src={area.image} alt="" loading="lazy" className="aspect-[2/1] w-full object-cover" />
            <div className="p-5 sm:p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-900">{area.name}</h2>
              <p className="mt-1 text-sm font-semibold text-amber-700">Best for: {area.bestFor}</p>
              <p className="mt-3 text-gray-700">{area.summary}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {area.pros.map((p) => (
                    <li key={p} className="flex gap-2"><ThumbsUp className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> {p}</li>
                  ))}
                </ul>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {area.cons.map((c) => (
                    <li key={c} className="flex gap-2"><ThumbsDown className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" /> {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <StayMap />
      </div>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Prefer to browse by price and rating?</h2>
          <p className="text-sm text-gray-600">See hotels, guesthouses and backpackers on our accommodation page.</p>
        </div>
        <Link to="/accommodation" className="inline-flex justify-center px-5 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">
          Browse places to stay
        </Link>
      </section>
    </div>
  </div>
);

export default WhereToStay;
