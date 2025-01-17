import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut, Home, Phone, Package } from 'lucide-react';
import NewsBanner from './news-banner';
import '../styles/Animation.css';
import Helmet from 'react-helmet';

const Navbar = ({ pageTitle }) => { // Accept pageTitle as a prop
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientName, setClientName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const title = pageTitle || 'Abrasif Italia'; // Use pageTitle or default to 'Abrasif Italia'

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedClientName = localStorage.getItem('clientName');
    if (token && storedClientName) {
      setIsLoggedIn(true);
      setClientName(storedClientName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clientName');
    localStorage.removeItem('clientId');
    setIsLoggedIn(false);
    setClientName('');
    setIsMobileMenuOpen(false);
    navigate('/'); // Redirect to home page
  };

  const menuItems = [
    { label: 'Accueil', icon: <Home size={20} className="text-danger" />, to: '/' },
    { label: 'Nos Produits', icon: <Package size={20} className="text-danger" />, to: '/article' },
    { label: 'Contact', icon: <Phone size={20} className="text-danger" />, to: '/client/contact' },
  ];

  return (
    <div>
      <Helmet>
        <title>{title} - Abrasif Italia</title>
      </Helmet>
      {/* Fixed News Banner */}
      <div className="fixed-top ">
        <NewsBanner />
      </div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light shadow-sm"
        style={{ position: 'fixed', top: '40px', width: '100%', zIndex: 1030 }}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/assets/logo-v1.png"
              height="40"
              width="50"
              alt="Logo"
              className="d-inline-block"
            />
<div className="d-flex align-items-center">
  <span className="ms-2 fw-bold">
    <span className="text-success pulse-animation">
      Abrasif
    </span>
    <span className="text-danger pulse-animation space-between" style={{ animationDelay: "0.5s" }}>
      Italia
    </span>
  </span>
</div>
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
              {isLoggedIn && clientName && (
                <span className="navbar-text me-3 text-muted">
                  Bonjour, <span className="font-semibold text-success animate-bounce">{clientName}</span>
                </span>
              )}
              {menuItems.map((item) => (
                <Link key={item.label} to={item.to} className="nav-link mx-2 text-dark fw-bold">
                  {item.icon}
                  <span className="ms-2">{item.label}</span>
                </Link>
              ))}

              {!isLoggedIn && (
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle mx-2 text-dark"
                    id="dropdownAccount"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <User size={20} className="text-danger" />
                    <span className="ms-2 fw-bold">Compte</span>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownAccount">
                    <li>
                      <Link to="/login" className="dropdown-item">
                        Connexion
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="dropdown-item">
                        S'inscrire
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {isLoggedIn && (
                <button onClick={handleLogout} className="btn btn-outline-danger mx-2">
                  <LogOut size={20} />
                  <span className="ms-2 btn-danger ">Déconnexion</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Content Padding */}
      <div style={{ paddingTop: '90px' }}></div>
    </div>
  );
};

export default Navbar;
