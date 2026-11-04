import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingChatWidget from '../chat/FloatingChatWidget';
import useSEO from '../../hooks/useSEO';
import Toaster from '../common/Toaster';

const Layout = () => {
  useSEO();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {/* The AI Assistant page already is the chat */}
      {pathname !== '/ai-assistant' && <FloatingChatWidget />}
    </div>
  );
};

export default Layout;
