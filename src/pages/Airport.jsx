import { Link } from 'react-router-dom';
import { Car, CheckCircle2, Plane, Smartphone, Wallet } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import PartnerCard from '../components/common/PartnerCard';
import { AIRPORT } from '../data/guides';
import { CAR_HIRE_URL } from '../utils/partners';

const ICONS = [Car, Smartphone, Wallet, Car];

const Airport = () => (
  <div className="min-h-screen bg-gray-50">
    <PageHero
      image="transportation"
      title="Arriving at Cape Town Airport"
      subtitle="Getting to the city, SIM cards, money and car hire at Cape Town International (CPT)"
    />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <p className="flex gap-3 text-lg text-gray-800 leading-relaxed">
        <Plane className="h-6 w-6 text-amber-600 shrink-0 mt-1" /> {AIRPORT.intro}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {AIRPORT.sections.map((section, i) => {
          const Icon = ICONS[i] || CheckCircle2;
          return (
            <section key={section.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-3">
                <Icon className="h-5 w-5 text-amber-600" /> {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2 text-gray-700"><CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" /> {item}</li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <PartnerCard
        icon={Car}
        title="Compare car hire at Cape Town Airport"
        text="Prices from the main rental companies, with pick-up at the airport."
        href={CAR_HIRE_URL}
        button="Compare car hire"
        partner="DiscoverCars"
      />

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Next steps</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['/flights', 'Find flights to Cape Town'],
            ['/where-to-stay', 'Choose where to stay'],
            ['/transportation', 'Getting around the city'],
          ].map(([to, label]) => (
            <Link key={to} to={to} className="rounded-xl border border-gray-200 p-4 font-semibold text-gray-900 hover:border-gray-900">{label}</Link>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default Airport;
