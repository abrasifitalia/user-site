import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut, Home, Phone, Package } from 'lucide-react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientName, setClientName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const storedClientName = localStorage.getItem('clientName');
      if (storedClientName) {
        setClientName(storedClientName);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clientName');
    setIsLoggedIn(false);
    setClientName('');
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const menuItems = isLoggedIn ? [
    { label: 'Accueil', icon: <Home size={20} />, to: '/' },
    { label: 'Contact', icon: <Phone size={20} />, to: '/client/contact' },
    { label: 'Nos Articles', icon: <Package size={20} />, to: '/article' }
  ] : [
    { label: 'Accueil', icon: <Home size={20} />, to: '/' },
    { label: 'Connexion', icon: <User size={20} />, to: '/login' },
    { label: "S'inscrire", icon: <User size={20} />, to: '/register' },
    { label: 'Contact', icon: <Phone size={20} />, to: '/client/contact' },
    { label: 'Nos Articles', icon: <Package size={20} />, to: '/article' }
  ];

  return (
    <nav className="bg-gray-100 border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <img
              src="/assets/Capture d'écran 2024-12-12 152743.png"
              alt="Logo"
              className="h-10 w-auto"
            />
            <span className="ml-3 text-xl font-bold text-gray-800">
              Abrasif Italia
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && (
              <span className="text-gray-800">
                Bonjour, <span className="font-semibold">{clientName}</span>
              </span>
            )}

            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-black hover:text-green-700 hover:bg-gray-200 rounded-md transition-colors"
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut size={20} />
                <span className="ml-2">Déconnexion</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {isLoggedIn && (
            <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
              Bonjour, <span className="font-semibold">{clientName}</span>
            </div>
          )}

          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center px-4 py-2 text-base font-medium text-black hover:text-green-700 hover:bg-gray-200 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-base font-medium text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
            >
              <LogOut size={20} />
              <span className="ml-3">Déconnexion</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
