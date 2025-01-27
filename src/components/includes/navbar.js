import React, { useState, useEffect } from 'react'; // Importing React and hooks
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate for routing
import { Menu, X, ShoppingBag, User, LogOut, Home, Phone, Package } from 'lucide-react'; // Importing icons
import NewsBanner from './news-banner'; // Importing NewsBanner component
import '../styles/Animation.css'; // Importing CSS for animations
import Helmet from 'react-helmet'; // Importing Helmet for managing document head

const Navbar = ({ pageTitle , description , ImgUrl , keywords , ProductUrl }) => { // Accept pageTitle as a prop
  // State variables for managing login status and client name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientName, setClientName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate(); // Hook for navigation
  const title = pageTitle || 'Abrasif Italia'; // Use pageTitle or default to 'Abrasif Italia'

  // Effect to check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from local storage
    const storedClientName = localStorage.getItem('clientName'); // Get client name from local storage
    if (token && storedClientName) {
      setIsLoggedIn(true); // Set logged in state
      setClientName(storedClientName); // Set client name
    }
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('clientName'); // Remove client name from local storage
    localStorage.removeItem('clientId'); // Remove client ID from local storage
    setIsLoggedIn(false); // Update logged in state
    setClientName(''); // Clear client name
    setIsMobileMenuOpen(false); // Close mobile menu
    navigate('/'); // Redirect to home page
  };

  // Menu items for navigation
  const menuItems = [
    { label: 'Accueil', icon: <Home size={20} className="text-danger" />, to: '/' },
    { label: 'Nos Produits', icon: <Package size={20} className="text-danger" />, to: '/articles' },
    { label: 'Contact', icon: <Phone size={20} className="text-danger" />, to: '/contact-us' },
  ];

  return (
    <div>
      <Helmet>
        <title>{title} - Abrasif Italia</title> 
        <meta name="og:title" content={title || "Abrasif Italia"} />
        <meta name="og:description" content={description || "Découvrez Abrasivi Italia, leader des produits abrasifs et équipements de polissage en Tunisie. Large gamme de produits professionnels, prix compétitifs, livraison rapide. Fournisseur officiel Klindex avec showrooms à Ariana, Sousse et L'Aouina. Contactez-nous pour un devis gratuit! "}  />
        <meta name="og:image" content={ImgUrl || "/assets/logo-v1.png"} />
        <meta name="og:url" content={ProductUrl ||`https://abrasifitalia.com`} />
        <meta name="og:image:alt" content={`Abrasif Italia - ${title}`} />
        <meta name="keywords" content={keywords || "abrasifs tunisie, polissage tunisie, Klindex tunisie, équipement industriel tunisie, produits abrasifs professionnels, matériel de polissage, fournitures industrielles, ponceuse, disques abrasifs, pâte à polir, showroom Ariana, showroom Sousse, showroom L'Aouina"} />
      </Helmet>
      {/* Fixed News Banner */}
      <div style={{ position: 'fixed', width: '100%', zIndex: 1030 }}>
        

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" 
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
            aria-controls="navbarNav"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
            <div className="navbar-nav mx-auto">
              {isLoggedIn && clientName && ( // Display greeting if logged in
                <span className="navbar-text mx-4 my-2 p-2 text-muted ">
                  Bonjour, <span className="font-semibold text-success animate-bounce">{clientName}</span>
                </span>
              )}
              {menuItems.map((item) => ( // Render menu items
                <Link key={item.label} to={item.to} className="nav-link mx-4 my-2 p-2 text-dark fw-bold ">
                  {item.icon}
                  <span className="ms-2">{item.label}</span>
                </Link>
              ))}

             {/* {!isLoggedIn && ( // Show account dropdown if not logged in
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle mx-2 p-3 text-dark"
                    id="dropdownAccount"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <User size={20} className="text-success" />
                    <span className="ms-2 fw-bold text-success">Compte</span>
                  </a>
                  <ul className="dropdown-menu p-2 " aria-labelledby="dropdownAccount">
                    <li>
                      <Link to="/login" className="dropdown-item bg-danger text-white  rounded rounded-lg mb-2">
                        Connexion
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="dropdown-item bg-danger text-white  rounded rounded-lg ">
                        S'inscrire
                      </Link>
                    </li>
                  </ul>
                </div>
              )} */}

              {isLoggedIn && ( // Show logout button if logged in
                <button onClick={handleLogout} className="btn btn-outline-danger mx-2">
                  <LogOut size={20} />
                  <span className="ms-2 btn-danger ">Déconnexion</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
</div>
      {/* Content Padding */}
      <div style={{ paddingTop: '75px' }}></div> {/* Padding for content below navbar */}
    </div>
  );
};

export default Navbar; // Exporting Navbar component
