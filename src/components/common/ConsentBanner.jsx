import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_EVENT, getConsent, setConsent } from '../../utils/consent';

const ConsentBanner = () => {
  const [open, setOpen] = useState(() => !getConsent());

  useEffect(() => {
    const onChange = (e) => setOpen(!e.detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!open) return null;

  const choose = (value) => {
    const driveRunning = Boolean(window.__driveLoaded);
    setConsent(value);
    // A script that already ran can only be removed by reloading the page
    if (value === 'declined' && driveRunning) window.location.reload();
  };

  const button = 'flex-1 px-4 py-2 rounded-lg border border-gray-900 text-sm font-semibold transition-colors';

  return (
    <div role="region" aria-label="Cookie choices" className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-2xl sm:flex sm:items-center sm:gap-6">
        <p className="text-sm text-gray-700">
          With your permission, we load travel partner tools that may use cookies to show offers and measure bookings.
          The site works without them.{' '}
          <Link to="/privacy" className="underline font-medium text-gray-900">Privacy Policy</Link>
        </p>
        <div className="mt-3 sm:mt-0 flex gap-2 shrink-0">
          <button type="button" onClick={() => choose('declined')} className={`${button} bg-white text-gray-900 hover:bg-gray-100`}>
            Decline
          </button>
          <button type="button" onClick={() => choose('accepted')} className={`${button} bg-gray-900 text-white hover:bg-gray-800`}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
