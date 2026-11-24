import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Search, Loader2, ArrowRight, Hotel, Car, Ticket } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { AIRPORTS, fareUrl, flightSearchUrl } from '../utils/partners';

const isoDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

const NEXT_STEPS = [
  { to: '/accommodation', Icon: Hotel, title: 'Find a place to stay' },
  { to: '/transportation', Icon: Car, title: 'Car hire and transfers' },
  { to: '/attractions', Icon: Ticket, title: 'Tours and attractions' },
];

const Flights = () => {
  const [from, setFrom] = useState('JNB');
  const [depart, setDepart] = useState(() => isoDate(30));
  const [back, setBack] = useState(() => isoDate(37));
  const [passengers, setPassengers] = useState(1);
  const [result, setResult] = useState({ from: null, fares: [], failed: false });

  const city = AIRPORTS.find((a) => a.code === from)?.name;
  const loading = result.from !== from;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/flights?origin=${from}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => setResult({ from, fares: data.fares || [], failed: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') setResult({ from, fares: [], failed: true });
      });
    return () => controller.abort();
  }, [from]);

  const invalid = !depart || depart < isoDate(0) || (back && back < depart);
  const field = 'w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900';

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        image="attractions"
        title="Flights to Cape Town"
        subtitle="Compare fares, then book with the airline or travel site you choose"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-medium text-gray-700">
              From
              <select value={from} onChange={(e) => setFrom(e.target.value)} className={field}>
                {AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Depart
              <input type="date" value={depart} min={isoDate(0)} onChange={(e) => setDepart(e.target.value)} className={field} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Return (optional)
              <input type="date" value={back} min={depart || isoDate(0)} onChange={(e) => setBack(e.target.value)} className={field} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Adults
              <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className={field}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
          </div>
          {invalid ? (
            <p role="alert" className="mt-4 text-sm text-red-700">Choose a departure date from today, with the return on or after it.</p>
          ) : (
            <a
              href={flightSearchUrl({ from, depart, back, passengers })}
              target="_blank"
              rel="sponsored noopener"
              className="mt-5 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800"
            >
              <Search className="h-5 w-5" /> Search flights
            </a>
          )}
          <p className="mt-3 text-xs text-gray-500">
            Affiliate links: results open on Aviasales, and we may earn a commission if you book.
          </p>
        </section>

        <section aria-live="polite">
          <h2 className="text-2xl font-bold text-gray-900">Recent one-way fares from {city}</h2>
          <p className="mt-1 mb-4 text-sm text-gray-600">
            Found in recent searches, per person. Prices and seats change, so check the final price before you book.
          </p>
          {loading ? (
            <p className="flex items-center gap-2 text-gray-600"><Loader2 className="h-5 w-5 animate-spin" /> Looking for fares…</p>
          ) : result.fares.length ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.fares.map((fare) => (
                <li key={fare.link} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col">
                  <span className="flex items-center gap-2 text-sm text-gray-600"><Plane className="h-4 w-4" /> {fare.from} → CPT</span>
                  <span className="mt-2 text-2xl font-bold text-gray-900">R{fare.price.toLocaleString('en-ZA')}</span>
                  <span className="mt-1 text-sm text-gray-700">{formatDate(fare.date)}</span>
                  <span className="text-sm text-gray-500">
                    {fare.stops === 0 ? 'Direct' : `${fare.stops} stop${fare.stops > 1 ? 's' : ''}`} · Airline {fare.airline}
                  </span>
                  <a href={fareUrl(fare.link)} target="_blank" rel="sponsored noopener" className="mt-4 inline-flex items-center gap-1.5 font-semibold text-gray-900 underline underline-offset-4">
                    Check this fare <ArrowRight className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              {result.failed ? 'Recent fares are unavailable right now.' : 'No recent fares for this route.'} You can still search above.
            </p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Next, plan your stay</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {NEXT_STEPS.map(({ to, Icon, title }) => (
              <Link key={to} to={to} className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 font-semibold text-gray-900 hover:border-gray-900">
                <Icon className="h-5 w-5 text-amber-600" /> {title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Flights;
