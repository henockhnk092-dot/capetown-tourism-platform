import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Heart, User, LogOut, Calendar, Receipt, ChevronDown } from 'lucide-react';
import { NAV_GROUPS } from '../../utils/constants';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';

const ACCOUNT_LINKS = [
  { name: 'My Profile', path: '/profile', Icon: User },
  { name: 'My Itineraries', path: '/my-itineraries', Icon: Calendar },
  { name: 'My Bookings', path: '/my-bookings', Icon: Receipt },
];

const isGroupActive = (group, pathname) =>
  group.items ? group.items.some((item) => item.path === pathname) : group.path === pathname;

const desktopTopClass = (active) =>
  `relative flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
    active ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
  }`;

// Underline under the active top-level item
const ActiveBar = ({ show }) =>
  show ? <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gray-900" /> : null;

const subLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors border-l-4 ${
    isActive
      ? 'border-gray-900 bg-gray-100 text-gray-900 font-semibold'
      : 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-md text-base transition-colors ${
    isActive ? 'bg-gray-900 text-white font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
  }`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const { pathname } = useLocation();
  const { favoritesCount } = useFavorites();
  const { user, logout } = useAuth();

  // Close every menu after navigating
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenGroup(null);
    setShowUserMenu(false);
  }, [pathname]);

  // Hide on scroll down, show on scroll up (but never while the mobile menu is open)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10 || currentScrollY < lastScrollY.current || isMenuOpen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setOpenGroup(null);
        setShowUserMenu(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    const onPointer = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenGroup(null);
        setShowUserMenu(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setShowUserMenu(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };

  const accountActive = ACCOUNT_LINKS.some((link) => link.path === pathname);

  return (
    <header
      ref={navRef}
      className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-gray-700" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Cape Town Tourism</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV_GROUPS.map((group) => {
              const active = isGroupActive(group, pathname);
              if (!group.items) {
                return (
                  <NavLink key={group.path} to={group.path} end className={desktopTopClass(active)}>
                    {group.name}
                    <ActiveBar show={active} />
                  </NavLink>
                );
              }
              const open = openGroup === group.name;
              return (
                <div
                  key={group.name}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.name)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    className={desktopTopClass(active || open)}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => setOpenGroup(open ? null : group.name)}
                  >
                    {group.name}
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                    <ActiveBar show={active} />
                  </button>
                  {open && (
                    // pt-2 keeps the hover area continuous between button and panel
                    <div className="absolute left-0 top-full pt-2 w-60">
                      <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        {group.items.map((item) => (
                          <NavLink key={item.path} to={item.path} className={subLinkClass}>
                            <span aria-hidden="true">{item.icon}</span>
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Favorites */}
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `relative p-2 ml-1 rounded-md transition-colors ${
                  isActive ? 'bg-gray-100 text-red-500' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
              aria-label="Favorites"
            >
              <Heart className="h-6 w-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </NavLink>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-haspopup="true"
                  aria-expanded={showUserMenu}
                  className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                    accountActive || showUserMenu ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium max-w-[8rem] truncate">{user.displayName || 'Profile'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    {ACCOUNT_LINKS.map(({ name, path, Icon }) => (
                      <NavLink key={path} to={path} className={subLinkClass}>
                        <Icon className="h-4 w-4" />
                        {name}
                      </NavLink>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100 mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="ml-1 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Login
              </NavLink>
            )}
          </nav>

          {/* Mobile menu button (below 1024px) */}
          <div className="lg:hidden flex items-center space-x-2">
            <NavLink
              to="/favorites"
              className={({ isActive }) => `relative p-2 rounded-md ${isActive ? 'text-red-500 bg-gray-100' : 'text-gray-700'}`}
              aria-label="Favorites"
            >
              <Heart className="h-6 w-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation: same groups as the desktop dropdowns */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t bg-white shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto" aria-label="Main">
          <div className="px-3 py-3 space-y-4">
            {NAV_GROUPS.filter((g) => g.path).length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {NAV_GROUPS.filter((g) => g.path).map((group) => (
                  <NavLink
                    key={group.path}
                    to={group.path}
                    end
                    className={({ isActive }) =>
                      `text-center px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                        isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`
                    }
                  >
                    {group.name}
                  </NavLink>
                ))}
              </div>
            )}

            {NAV_GROUPS.filter((g) => g.items).map((group) => (
              <div key={group.name}>
                <p
                  className={`px-3 mb-1 text-xs font-semibold uppercase tracking-wider ${
                    isGroupActive(group, pathname) ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {group.name}
                </p>
                {group.items.map((item) => (
                  <NavLink key={item.path} to={item.path} className={mobileLinkClass}>
                    <span aria-hidden="true">{item.icon}</span>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 pt-3">
              {user ? (
                <>
                  <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Signed in as {user.displayName || user.email}
                  </p>
                  {ACCOUNT_LINKS.map(({ name, path, Icon }) => (
                    <NavLink key={path} to={path} className={mobileLinkClass}>
                      <Icon className="h-5 w-5" />
                      {name}
                    </NavLink>
                  ))}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-base text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-base font-medium bg-gray-900 text-white hover:bg-gray-800"
                >
                  <User className="h-5 w-5" />
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
