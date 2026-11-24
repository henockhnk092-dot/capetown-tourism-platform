import { ExternalLink } from 'lucide-react';

// Link to a booking partner, always labelled as an affiliate link
const PartnerCard = ({ icon: Icon, title, text, href, button, partner }) => (
  <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
    <span className="h-12 w-12 shrink-0 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
      <Icon className="h-6 w-6" />
    </span>
    <div className="flex-1 min-w-0">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{text}</p>
      <p className="mt-2 text-xs text-gray-500">Affiliate link: you book and pay with {partner}, and we may earn a commission.</p>
    </div>
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener"
      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
    >
      {button}
      <ExternalLink className="h-4 w-4" />
    </a>
  </section>
);

export default PartnerCard;
