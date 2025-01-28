import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Home, Package, Phone } from 'lucide-react';
import Helmet from 'react-helmet';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/Navbar.css';
import { softScroll } from '../utils/soft_scroll';

const NavbarComponent = ({ pageTitle, description, ImgUrl, keywords, ProductUrl }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientName, setClientName] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const title = pageTitle || 'Abrasif Italia';

  useEffect(() => {
    softScroll();
    const token = localStorage.getItem('token');
    const storedClientName = localStorage.getItem('clientName');
    if (token && storedClientName) {
      setIsLoggedIn(true);
      setClientName(storedClientName);
    }

    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clientName');
    setIsLoggedIn(false);
    navigate('/');
  };

  const menuItems = [
    { label: 'Accueil', icon: <Home  className="navbar-item-icon" />, to: '/' },
    { label: 'Nos Produits', icon: <Package className="navbar-item-icon" />, to: '/articles' },
    { label: 'Contact', icon: <Phone  className="navbar-item-icon" />, to: '/contact-us' },
  ];

  return (
    <>
      <Helmet>
        <title>{title} - Abrasif Italia</title>
        <meta name="og:title" content={title || "Abrasif Italia"} />
        <meta name="og:description" content={description || "Découvrez Abrasivi Italia, leader des produits abrasifs et équipements de polissage en Tunisie."} />
        <meta name="og:image" content={ImgUrl || "/assets/logo-v1.png"} />
        <meta name="og:url" content={ProductUrl || `https://abrasifitalia.com`} />
        <meta name="og:image:alt" content={`Abrasif Italia - ${title}`} />
        <meta name="keywords" content={keywords || "abrasifs tunisie, polissage tunisie, Klindex tunisie, équipement industriel tunisie"} />
      </Helmet>
        <Navbar expand="lg" className="navbar-light bg-white shadow-sm fixed-top">
        <div className="container">

        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src="/assets/logo-v1.png" height="50" width="64" alt="Logo" className="d-inline-block" />
            <div className="d-flex flex-column justify-content-center ms-2" style={{ height: '50px' }}>
              <div className="fw-bold" style={{ marginBottom: '-5px' }}>
                <span className="secondary-color brand-name-arabic">ابرازيف </span>
                <span className="primary-color brand-name-arabic">ايطاليا</span>
              </div>
              <div className="fw-bold" style={{ marginTop: '-5px' }}> 
                <span className="secondary-color brand-name-french">Abrasif</span>
                <span className="primary-color brand-name-french ms-1">Italia</span>
              </div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className={`mx-auto ${isMobileView ? 'text-start' : 'text-center'}`}>
              {isLoggedIn && clientName && (
                <Nav.Item className="mx-3">
                  <span className="text-muted">Bonjour, <span className="text-success fw-bold">{clientName}</span></span>
                </Nav.Item>
              )}
              {menuItems.map((item) => (
                <Nav.Link key={item.label} as={Link} to={item.to} className="mx-3">
                  {item.icon}   
                  <span className="ms-2 fw-bold navbar-item">{item.label}</span>
                </Nav.Link>
              ))}
              {!isLoggedIn ? (
                <NavDropdown
                  title={
                    <>
                      <User  className="navbar-item-icon" />
                      <span className="ms-2 fw-bold navbar-item">Compte</span>
                    </>
                  }
                  id="dropdownAccount"
                  className="mx-3"
                >
                  <NavDropdown.Item as={Link} to="/login" className="navbar-item">
                    Connexion
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register" className="navbar-item">
                    S'inscrire
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <button onClick={handleLogout} className="btn btn-outline-danger mx-3">
                    <LogOut size={20} />
                    <span className="ms-2 fw-bold">Déconnexion</span>
                  </button>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div style={{ paddingTop: '75px' }}></div>
    </>
  );
};

export default NavbarComponent;