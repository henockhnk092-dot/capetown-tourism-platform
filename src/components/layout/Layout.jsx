import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingChatWidget from '../chat/FloatingChatWidget';
import useSEO from '../../hooks/useSEO';
import Toaster from '../common/Toaster';
import ConsentBanner from '../common/ConsentBanner';

const PRIVATE_PAGE = /^\/(login|signup|profile|favorites|my-bookings|my-itineraries)(\/|$)/;

const Layout = () => {
  useSEO();
  const { pathname } = useLocation();

  // Leave the affiliate script behind on sign-in and account pages (see index.html).
  // Router state is kept in history, so the redirect after login still works.
  const needsReload = Boolean(window.__driveLoaded) && PRIVATE_PAGE.test(pathname);
  useEffect(() => {
    if (needsReload) window.location.reload();
  }, [needsReload]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {!needsReload && <Outlet />}
      </main>
      <Footer />
      <Toaster />
      <ConsentBanner />
      {/* The AI Assistant page already is the chat */}
      {pathname !== '/ai-assistant' && <FloatingChatWidget />}
    </div>
  );
};

export default Layout;
