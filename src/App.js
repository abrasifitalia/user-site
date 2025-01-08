import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Home from './components/Home';
import Contact from './components/Contact';
import ArticlesList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import Login from './components/Login';
import Register from './components/Register';
import Order from './components/Order';
import Articleliste from './components/cccon';
import PrivateRoute from './components/PrivateRoute';  // Importer PrivateRoute
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

          {/* Utiliser PrivateRoute pour les pages protégées */}
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
          
          {/* Protéger aussi la page de commande */}
          <Route 
            path="/order" 
            element={<PrivateRoute element={<Order />} />} 
          />
          <Route path="/articel" element={<Articleliste />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
