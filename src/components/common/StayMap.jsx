import { useEffect, useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { CONSENT_EVENT, getConsent } from '../../utils/consent';
import { STAY22_MAP_URL } from '../../utils/partners';

// Live hotel prices on a Stay22 map. Loads after consent, or when the visitor asks for it.
const StayMap = () => {
  const [show, setShow] = useState(() => getConsent() === 'accepted');

  useEffect(() => {
    const onChange = (e) => {
      if (e.detail) setShow(e.detail === 'accepted');
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return (
    <section className="mb-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">Live hotel prices on the map</h2>
        <p className="mt-1 text-sm text-gray-600">
          Compare current prices across Cape Town and book on the partner&apos;s site. Affiliate links: we may earn a commission.
        </p>
      </div>
      {show ? (
        <iframe
          title="Map of Cape Town hotels with live prices"
          src={STAY22_MAP_URL}
          loading="lazy"
          className="block w-full h-[460px] border-0"
        />
      ) : (
        <div className="h-56 bg-gray-100 flex flex-col items-center justify-center gap-3 px-4 text-center">
          <MapIcon className="h-8 w-8 text-gray-500" />
          <button type="button" onClick={() => setShow(true)} className="px-5 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">
            Show hotel map
          </button>
          <p className="text-xs text-gray-500">This loads content from Stay22, which may use cookies.</p>
        </div>
      )}
    </section>
  );
};

export default StayMap;
