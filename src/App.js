import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import CookieConsent from "react-cookie-consent"; // Import du package
import Home from './components/Home/Home';
import Contact from './components/Contact';
import ArticlesList from './components/Protected-ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Order from './components/Order';
import Articleliste from './components/Public-ArticlesList';
import PrivateRoute from './components/PrivateRoute';  
import { AuthProvider } from './context/AuthContext'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client/contact" element={<Contact />} />
          <Route 
            path="/articles" 
            element={<PrivateRoute element={<ArticlesList />} />} 
          />
          <Route 
            path="/articles/:id" 
            element={<PrivateRoute element={<ArticleDetail />} />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/order" 
            element={<PrivateRoute element={<Order />} />} 
          />
          <Route path="/article" element={<Articleliste />} />
        </Routes>

        {/* Bannière de consentement aux cookies */}
        <CookieConsent
          location="bottom"
          buttonText="J'accepte"
          cookieName="userConsent"
          style={{ background: "#dc3545", color: "#ffffff" }}
          buttonStyle={{ color: "#198754", fontSize: "13px" }}
          expires={365}
        >
          Ce site utilise des cookies pour améliorer l'expérience utilisateur.{" "}
          <a href="/" style={{ color: "#ffd700" }}>En savoir plus</a>.
        </CookieConsent>
      </Router>
    </AuthProvider>
  );
};

export default App;
