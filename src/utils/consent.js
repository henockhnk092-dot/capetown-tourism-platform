// Visitor's choice about third-party partner content (Travelpayouts Drive, hotel map)
const KEY = 'ct-consent';
export const CONSENT_EVENT = 'ct-consent-change';

export const getConsent = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export const setConsent = (value) => {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // storage unavailable: the choice lasts for this visit only
  }
  if (value === 'accepted') window.__loadDrive?.();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
};

export const reopenConsent = () => window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
