import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { FAQS } from '../data/guides';

const FAQ = () => (
  <div className="min-h-screen bg-gray-50">
    <PageHero
      image="resources"
      title="Cape Town Travel FAQ"
      subtitle="Visas, safety, money, tipping, plugs, load-shedding and getting around"
    />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-3">
      {FAQS.map(({ q, a }) => (
        <details key={q} className="group bg-white rounded-xl border border-gray-200 shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-gray-900">
            <h2 className="text-base sm:text-lg">{q}</h2>
            <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 text-gray-700 leading-relaxed">{a}</p>
        </details>
      ))}

      <section className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Still have a question?</h2>
          <p className="text-sm text-gray-600">Ask our free AI assistant, or read the safety tips.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/ai-assistant" className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">
            <MessageCircle className="h-4 w-4" /> Ask the assistant
          </Link>
          <Link to="/safety" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:border-gray-900">Safety</Link>
        </div>
      </section>
    </div>
  </div>
);

export default FAQ;
