import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { BUSINESS } from './utils/constants';
import './index.css';

// Pages are loaded on demand so the first visit downloads less JavaScript
const Home = lazy(() => import('./pages/Home'));
const Attractions = lazy(() => import('./pages/Attractions'));
const Accommodation = lazy(() => import('./pages/Accommodation'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const Contact = lazy(() => import('./pages/Contact'));
const ItineraryPlanner = lazy(() => import('./pages/ItineraryPlanner'));
const Blog = lazy(() => import('./pages/Blog'));
const Transportation = lazy(() => import('./pages/Transportation'));
const Safety = lazy(() => import('./pages/Safety'));
const Events = lazy(() => import('./pages/Events'));
const About = lazy(() => import('./pages/About'));
const Resources = lazy(() => import('./pages/Resources'));
const Profile = lazy(() => import('./pages/Profile'));
const MyItineraries = lazy(() => import('./pages/MyItineraries'));
const MyBookings = lazy(() => import('./pages/MyBookings'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Favorites = lazy(() => import('./pages/Favorites'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="h-10 w-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
          </div>
        }
      >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="attractions" element={<Attractions />} />
          <Route path="accommodation" element={<Accommodation />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="planner" element={<ItineraryPlanner />} />
          <Route path="blog" element={<Blog />} />
          <Route path="transportation" element={<Transportation />} />
          <Route path="safety" element={<Safety />} />
          <Route path="events" element={<Events />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-itineraries" element={<MyItineraries />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="privacy"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">Last updated: November 2026</p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
                  <p className="mb-4">
                    Welcome to Cape Town Tourism Platform, operated by {BUSINESS.legalName}, Cape Town,
                    South Africa. We respect your privacy and are committed to protecting your personal
                    data in line with the Protection of Personal Information Act (POPIA).
                  </p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
                  <p className="mb-4">
                    We may collect and process the following data about you:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Information you provide when using our AI assistant</li>
                    <li>Contact information when you reach out to us</li>
                    <li>Usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
                  <p className="mb-4">
                    We use your information to:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Provide personalized travel recommendations</li>
                    <li>Improve our services and user experience</li>
                    <li>Respond to your inquiries</li>
                    <li>Send newsletters and updates (with your consent)</li>
                  </ul>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Affiliate Partners</h2>
                  <p className="mb-4">
                    Some links lead to travel partners, and we may earn a commission if you book, at no extra cost to you.
                    We use Travelpayouts to add and measure these links. Its script runs on our public pages, where it can
                    see page content and link clicks and may use cookies or similar technologies. We do not load it on
                    sign-in and account pages. Partners handle your booking and payment under their own privacy policies.
                  </p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
                  <p className="mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Access your personal data</li>
                    <li>Request correction or deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:{' '}
                    <a href={`mailto:${BUSINESS.email}`} className="text-gray-900 underline">
                      {BUSINESS.email}
                    </a>
                  </p>
                </div>
              </div>
            }
          />
          <Route
            path="terms"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">Last updated: November 2026</p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Acceptance of Terms</h2>
                  <p className="mb-4">
                    Cape Town Tourism Platform is operated by {BUSINESS.legalName}. By accessing and using
                    the platform, you accept and agree to be bound by the terms and provisions of this
                    agreement.
                  </p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Use of Service</h2>
                  <p className="mb-4">
                    Our platform provides tourism information and planning tools for Cape Town. We strive
                    to provide accurate and up-to-date information, but we make no guarantees about the
                    accuracy, completeness, or reliability of any content.
                  </p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">AI Assistant</h2>
                  <p className="mb-4">
                    Our AI-powered travel assistant is provided for informational purposes only. While we
                    aim to provide helpful recommendations, you should verify important details and make
                    your own informed decisions about travel plans.
                  </p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Limitation of Liability</h2>
                  <p className="mb-4">
                    {BUSINESS.legalName} shall not be liable for any indirect, incidental, special,
                    consequential, or punitive damages resulting from your use of or inability to use the
                    service.
                  </p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to Terms</h2>
                  <p className="mb-4">
                    We reserve the right to modify or replace these Terms at any time. It is your
                    responsibility to check these Terms periodically for changes.
                  </p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Contact</h2>
                  <p className="mb-4">
                    Questions about the Terms of Service should be sent to:{' '}
                    <a href={`mailto:${BUSINESS.email}`} className="text-gray-900 underline">
                      {BUSINESS.email}
                    </a>
                  </p>
                </div>
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                  <p className="text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
