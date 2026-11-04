import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

// Small on-page notifications instead of browser alert() pop-ups.
// Call toast('Saved!', 'success') from anywhere; <Toaster /> in the layout shows it.
const EVENT = 'app-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const toast = (message, type = 'info') => {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { message, type } }));
};

const STYLES = {
  success: { Icon: CheckCircle, className: 'border-green-200 bg-green-50 text-green-800' },
  error: { Icon: AlertCircle, className: 'border-red-200 bg-red-50 text-red-800' },
  info: { Icon: Info, className: 'border-gray-200 bg-white text-gray-800' },
};

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const onToast = (e) => {
      const id = Date.now() + Math.random();
      setToasts((list) => [...list.slice(-2), { id, ...e.detail }]);
      setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 4500);
    };
    window.addEventListener(EVENT, onToast);
    return () => window.removeEventListener(EVENT, onToast);
  }, []);

  return (
    <div className="fixed top-20 inset-x-4 sm:inset-x-auto sm:right-4 sm:w-96 z-[60] space-y-2 pointer-events-none" aria-live="polite">
      {toasts.map(({ id, message, type }) => {
        const { Icon, className } = STYLES[type] || STYLES.info;
        return (
          <div key={id} role="status" className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${className}`}>
            <Icon className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="flex-1 text-sm">{message}</p>
            <button
              type="button"
              onClick={() => setToasts((list) => list.filter((t) => t.id !== id))}
              className="opacity-60 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toaster;
