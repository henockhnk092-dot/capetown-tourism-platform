import { Target, Users, Sparkles, Heart, Mail, Phone, Globe, Cpu } from 'lucide-react';
import { BUSINESS, SOCIAL_MEDIA, IMAGE_CREDITS } from '../utils/constants';
import SocialLinks from '../components/common/SocialLinks';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Cape Town Tourism Platform</h1>
          <p className="text-xl text-gray-600">
            Your ultimate digital guide to exploring the beauty of Cape Town
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gray-100 p-3 rounded-full mr-4">
              <Target className="h-8 w-8 text-gray-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We created this platform to help travelers discover and experience the magic of Cape Town,
            South Africa's Mother City. Our goal is to provide comprehensive, up-to-date information
            and AI-powered tools that make planning your Cape Town adventure effortless and enjoyable.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're seeking breathtaking natural landscapes, rich history and culture, world-class
            wine and cuisine, or thrilling adventures, our platform guides you to create unforgettable
            memories in one of the world's most beautiful destinations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="bg-gray-100 p-3 rounded-full w-fit mb-4">
              <Sparkles className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Planning</h3>
            <p className="text-gray-600">
              Our Google Gemini AI assistant provides personalized recommendations and helps create
              custom itineraries based on your preferences, budget, and travel style.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="bg-gray-100 p-3 rounded-full w-fit mb-4">
              <Users className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Information</h3>
            <p className="text-gray-600">
              Access detailed guides on attractions, transportation, safety, events, and more - everything
              you need to plan and enjoy your Cape Town visit.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="bg-gray-100 p-3 rounded-full w-fit mb-4">
              <Heart className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Made with Passion</h3>
            <p className="text-gray-600">
              Built in Cape Town by HNK IoT Solutions, our platform combines cutting-edge technology with
              genuine love for Cape Town to deliver the best travel planning experience.
            </p>
          </div>
        </div>

        {/* Company Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <Cpu className="h-8 w-8 text-gray-700" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Who's Behind This Platform</h2>
            </div>
            <a href={BUSINESS.website} target="_blank" rel="noopener noreferrer">
              <img src="/hnk-logo-horizontal-black.png" alt={BUSINESS.legalName} className="h-10 w-auto" />
            </a>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The Cape Town Tourism Platform is built and run by{' '}
            <a href={BUSINESS.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 underline">
              {BUSINESS.legalName}
            </a>
            , a Cape Town technology company founded by {BUSINESS.founder}. HNK IoT Solutions builds
            IoT systems, web and mobile apps and AI tools for real-world problems, from smart-city
            street safety to energy monitoring.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Want a platform like this for your own tourism, hospitality or local business? Get in touch
            and we'll talk about what you need.
          </p>
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Technology</h2>
          <p className="text-lg text-gray-700 mb-6">
            This platform is built with modern web technologies to provide you with a fast, responsive,
            and delightful user experience:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">React 19</p>
              <p className="text-sm text-gray-600">UI Framework</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Vite</p>
              <p className="text-sm text-gray-600">Build Tool</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Tailwind CSS</p>
              <p className="text-sm text-gray-600">Styling</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Firebase</p>
              <p className="text-sm text-gray-600">Backend</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Gemini AI</p>
              <p className="text-sm text-gray-600">AI Assistant</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Formspree</p>
              <p className="text-sm text-gray-600">Contact Forms</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Open-Meteo</p>
              <p className="text-sm text-gray-600">Live Weather</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Leaflet</p>
              <p className="text-sm text-gray-600">Maps</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">React Router</p>
              <p className="text-sm text-gray-600">Navigation</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Cloudflare</p>
              <p className="text-sm text-gray-600">Hosting</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-6">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="flex items-center text-gray-700 mb-3">
                <Mail className="h-5 w-5 mr-3" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-gray-900">
                  {BUSINESS.email}
                </a>
              </div>
              <div className="flex items-center text-gray-700 mb-3">
                <Phone className="h-5 w-5 mr-3" />
                <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                  {BUSINESS.phone} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <Globe className="h-5 w-5 mr-3" />
                <a href={BUSINESS.website} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                  hnkiot.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <SocialLinks linkClassName="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700" />
            </div>
          </div>
        </div>

        {/* Open Source Section */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Source & Transparency</h2>
          <p className="text-gray-700 mb-4">
            This project is developed with modern web technologies and follows best practices in web development.
            We believe in transparency and continuous improvement.
          </p>
          <a
            href={SOCIAL_MEDIA.sourceRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            View on GitHub →
          </a>
          <a
            href={SOCIAL_MEDIA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 ml-0 sm:ml-3 mt-3 sm:mt-0 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
          >
            More from HNK IoT on GitHub
          </a>
        </div>

        {/* Photo Credits */}
        <div className="mt-8 text-sm text-gray-500">
          <h2 className="font-semibold text-gray-700 mb-2">Photo credits</h2>
          <p className="mb-2">
            Other photos are from Unsplash. These photos are from Wikimedia Commons and are used under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">
              CC BY-SA 4.0
            </a>
            :
          </p>
          <ul className="space-y-1">
            {IMAGE_CREDITS.map((credit) => (
              <li key={credit.source}>
                {credit.subject}: photo by{' '}
                <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline">
                  {credit.author}
                </a>{' '}
                ({credit.license})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
