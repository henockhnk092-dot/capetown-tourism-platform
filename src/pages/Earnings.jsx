import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Loader2, Lock, MousePointerClick, Receipt, RefreshCw, Wallet, Hourglass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PERIODS = [7, 30, 90];

// These partners have no statistics connection here, so link to their own reports
const DASHBOARDS = [
  { name: 'Stay22 (hotels)', url: 'https://hub.stay22.com/en' },
  { name: 'Viator (tours)', url: 'https://www.viator.com/partner/login' },
  { name: 'DiscoverCars (car hire)', url: 'https://www.discovercars.com/affiliate' },
  { name: 'Travelpayouts (full report)', url: 'https://app.travelpayouts.com/login' },
];

const usd = (n) => `$${n.toFixed(2)}`;
const shortDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });

const ERRORS = {
  401: 'Your sign-in has expired. Log in again.',
  403: 'This page is for the site owner. Sign in with the owner account (the email must be verified).',
  503: 'The earnings page is not set up yet.',
};

const Message = ({ children }) => (
  <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center max-w-md">
      <Lock className="h-10 w-10 text-gray-400 mx-auto mb-4" />
      {children}
    </div>
  </div>
);

const Earnings = () => {
  const { user } = useAuth();
  const [days, setDays] = useState(30);
  const [reload, setReload] = useState(0);
  const [result, setResult] = useState({ key: null, data: null, error: null });
  const key = `${user?.uid}-${days}-${reload}`;
  const loading = result.key !== key;

  useEffect(() => {
    if (!user) return undefined;
    const controller = new AbortController();
    user
      .getIdToken()
      .then((token) =>
        fetch(`/api/earnings?days=${days}`, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal })
      )
      .then(async (res) => {
        if (!res.ok) throw Object.assign(new Error('failed'), { status: res.status });
        setResult({ key, data: await res.json(), error: null });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setResult({ key, data: null, error: ERRORS[error.status] || 'The statistics are unavailable right now. Try again later.' });
      });
    return () => controller.abort();
  }, [user, days, key]);

  if (!user) {
    return (
      <Message>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Owner sign-in</h1>
        <p className="text-gray-600 mb-5">Log in with the owner account to see earnings.</p>
        <Link to="/login" state={{ from: '/earnings' }} className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">
          Log in
        </Link>
      </Message>
    );
  }
  if (!loading && result.error) {
    return (
      <Message>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Earnings</h1>
        <p role="alert" className="text-gray-600">{result.error}</p>
      </Message>
    );
  }

  const data = result.data;
  const tiles = data && [
    { label: 'Clicks', value: data.clicks, Icon: MousePointerClick },
    { label: 'Bookings', value: data.bookings, Icon: Receipt },
    { label: 'Pending commission', value: usd(data.pending), Icon: Hourglass },
    { label: 'Confirmed commission', value: usd(data.paid), Icon: Wallet },
  ];
  const peak = data ? Math.max(1, ...data.daily.map((d) => d.clicks)) : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Earnings</h1>
            <p className="mt-1 text-gray-600">Travelpayouts clicks and commission, in US dollars</p>
          </div>
          <div className="flex gap-2">
            {PERIODS.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={days === n}
                onClick={() => setDays(n)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                  days === n ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                }`}
              >
                {n} days
              </button>
            ))}
            <button
              type="button"
              aria-label="Refresh"
              disabled={loading}
              onClick={() => setReload((n) => n + 1)}
              className="px-3 py-2 rounded-lg bg-white border border-gray-300 hover:border-gray-900 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {loading || !data ? (
          <p aria-live="polite" className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading earnings…
          </p>
        ) : (
          <>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {tiles.map(({ label, value, Icon }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
                  <span className="flex items-center gap-2 text-sm text-gray-600"><Icon className="h-4 w-4 text-amber-600 shrink-0" /> {label}</span>
                  <span className="block mt-2 text-2xl font-bold text-gray-900">{value}</span>
                </div>
              ))}
            </section>
            <p className="text-gray-700">
              Travelpayouts balance: <strong>{usd(data.balance)}</strong>
            </p>

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Clicks per day</h2>
              {data.daily.some((d) => d.clicks) ? (
                <>
                  <div className="flex items-end gap-px sm:gap-1 h-40 border-b border-gray-300" role="img" aria-label={`Clicks per day, highest ${peak}`}>
                    {data.daily.map((d) => (
                      <div
                        key={d.date}
                        title={`${shortDate(d.date)}: ${d.clicks} clicks, ${d.bookings} bookings`}
                        className="flex-1 min-w-0 bg-gray-900 rounded-t"
                        style={{ height: `${(d.clicks / peak) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{shortDate(data.from)}</span>
                    <span>Highest: {peak}</span>
                    <span>{shortDate(data.to)}</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">No clicks in this period yet.</p>
              )}
            </section>

            {data.brands.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">By partner</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right tabular-nums">
                    <thead className="text-gray-600">
                      <tr>
                        <th className="py-2 text-left font-medium">Partner</th>
                        {['Clicks', 'Bookings', 'Pending', 'Confirmed'].map((h) => <th key={h} className="py-2 pl-4 font-medium">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {data.brands.map((b) => (
                        <tr key={b.name} className="border-t border-gray-100 text-gray-900">
                          <td className="py-2 text-left font-semibold">{b.name}</td>
                          <td className="py-2 pl-4">{b.clicks}</td>
                          <td className="py-2 pl-4">{b.bookings}</td>
                          <td className="py-2 pl-4">{usd(b.pending)}</td>
                          <td className="py-2 pl-4">{usd(b.paid)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            {data.partial && <p className="text-sm text-gray-600">The chart and partner table cover the first 1,000 records; the totals at the top are complete.</p>}
          </>
        )}

        <section>
          <h2 className="text-xl font-bold text-gray-900">Other partner reports</h2>
          <p className="mt-1 mb-4 text-sm text-gray-600">Earnings from your direct Stay22, Viator and DiscoverCars accounts are not included in the numbers above.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {DASHBOARDS.map(({ name, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-200 p-4 font-semibold text-gray-900 hover:border-gray-900">
                {name} <ExternalLink className="h-4 w-4 text-gray-500 shrink-0" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Earnings;
