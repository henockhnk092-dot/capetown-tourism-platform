import { Link } from 'react-router-dom';
import { CloudRain, Sun, Thermometer } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { MONTHS } from '../data/guides';

const peak = Math.max(...MONTHS.map((m) => m.high));

const SUMMARY = [
  { Icon: Sun, title: 'Best weather', text: 'October to April: warm, dry and sunny. February and March are warm with fewer crowds.' },
  { Icon: Thermometer, title: 'Busiest and priciest', text: 'Mid-December to mid-January. Book stays, cars and tours early.' },
  { Icon: CloudRain, title: 'Best value', text: 'May to August: rainy and cool, but quiet, cheaper and whale season.' },
];

const BestTime = () => (
  <div className="min-h-screen bg-gray-50">
    <PageHero
      image="safety"
      title="Best Time to Visit Cape Town"
      subtitle="Weather, crowds and what's on, month by month"
    />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {SUMMARY.map(({ Icon, title, text }) => (
          <section key={title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h2 className="flex items-center gap-2 font-bold text-gray-900"><Icon className="h-5 w-5 text-amber-600" /> {title}</h2>
            <p className="mt-2 text-sm text-gray-700">{text}</p>
          </section>
        ))}
      </div>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Month by month</h2>
        <p className="text-sm text-gray-600 mb-5">Typical daytime highs. Cape Town has dry summers and wet winters; weather varies from year to year.</p>
        <ul className="divide-y divide-gray-100">
          {MONTHS.map((m) => (
            <li key={m.month} className="py-4 grid gap-2 sm:grid-cols-[8rem_10rem_1fr] sm:items-center">
              <span className="font-semibold text-gray-900">{m.month}</span>
              <span className="flex items-center gap-2 text-sm text-gray-700">
                <span className="h-2 rounded-full bg-amber-500" style={{ width: `${(m.high / peak) * 4}rem` }} aria-hidden="true" />
                {m.high}°C · {m.rain}
              </span>
              <span className="text-gray-700">{m.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['/events', "See what's on"],
          ['/flights', 'Compare flight prices'],
          ['/day-trips', 'Plan day trips'],
        ].map(([to, label]) => (
          <Link key={to} to={to} className="bg-white rounded-xl border border-gray-200 p-4 font-semibold text-gray-900 hover:border-gray-900">{label}</Link>
        ))}
      </div>
    </div>
  </div>
);

export default BestTime;
