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
    navigate('/'); // Redirect to home page
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
    
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top text-center pb-3">
      
      <div className="container">
        <Link className="navbar-brand mx-auto" to="/">
          <img
            src="/assets/logo-v1.png"
            height="50"
            width="50"
            alt="Logo"
            className="d-inline-block align-text-top"
          />
          Abrasif Italia
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <div className="navbar-nav mx-auto">
            {isLoggedIn && (
              <span className="navbar-text me-3">
                Bonjour, <span className="font-semibold">{clientName}</span>
              </span>
            )}
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="nav-link mx-2"
              >
                {item.icon}
                <span className="ms-2">{item.label}</span>
              </Link>
            ))}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger mx-2"
              >
                <LogOut size={20} />
                <span className="ms-2">Déconnexion</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
