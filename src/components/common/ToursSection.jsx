import { useEffect, useState } from 'react';
import { ArrowRight, Clock, Star, Check } from 'lucide-react';
import { TOURS_URL } from '../../utils/partners';

// Popular Cape Town tours with live prices from Viator (via /api/tours).
// Shows nothing if the tours can't be loaded, so the page never looks broken.
const ToursSection = ({ query = '', count = 12, title = 'Popular tours and tickets', subtitle = 'Highly rated by travellers. Prices per person, from.', bare = false }) => {
  const [tours, setTours] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ n: String(count) });
    if (query) params.set('q', query);
    fetch(`/api/tours?${params}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : { tours: [] }))
      .then((data) => setTours(data.tours || []))
      .catch((error) => {
        if (error.name !== 'AbortError') setTours([]);
      });
    return () => controller.abort();
  }, [query, count]);

  if (tours && tours.length === 0) return null;
  const headingId = `tours-${(query || 'popular').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section className={bare ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'} aria-labelledby={headingId}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <h2 id={headingId} className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-gray-600">{subtitle}</p>
        </div>
        <a href={TOURS_URL} target="_blank" rel="sponsored noopener" className="inline-flex items-center gap-1.5 font-semibold text-gray-900 underline underline-offset-4">
          See all Cape Town tours <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {tours === null ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {[0, 1, 2].slice(0, count).map((i) => (
            <li key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-[3/2] bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <li key={tour.code} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              {tour.image && (
                <img src={tour.image} alt="" loading="lazy" width="480" height="320" className="aspect-[3/2] w-full object-cover bg-gray-100" />
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">{tour.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                  {tour.rating > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-900">{tour.rating.toFixed(1)}</span>
                      ({tour.reviews.toLocaleString('en-ZA')})
                    </span>
                  )}
                  {tour.duration && (
                    <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {tour.duration}</span>
                  )}
                </div>
                {tour.freeCancellation && (
                  <p className="mt-2 inline-flex items-center gap-1 text-sm text-green-700"><Check className="h-4 w-4" /> Free cancellation</p>
                )}
                <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                  <p className="text-sm text-gray-600">
                    from <span className="block text-xl font-bold text-gray-900">R{tour.price.toLocaleString('en-ZA')}</span>
                  </p>
                  <a
                    href={tour.url}
                    target="_blank"
                    rel="sponsored noopener"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
                  >
                    Check availability
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-xs text-gray-500">
        Affiliate links: tours are booked on Viator, and we may earn a commission at no extra cost to you. Check the final price before you book.
      </p>
    </section>
  );
};

export default ToursSection;
