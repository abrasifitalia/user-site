import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  

import Home from './components/Home/Home';
import Contact from './components/Home/Contact';

import ArticleDetail from './components/products/ArticleDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import Articleliste from './components/products/Public-ArticlesList';

import { AuthProvider } from './context/AuthContext'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CookieController } from './components/utils/cookie';
import PageNotFound from './components/utils/page_not-found';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home  />}   />
          <Route path="/contact-us" element={<Contact />} />
          <Route 
            path="/articles/:category/:subcategory/:id" 
            element={<ArticleDetail  />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles" element={<Articleliste />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <CookieController />
      </Router>
    </AuthProvider>
  );
};

export default App;
