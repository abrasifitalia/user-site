import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Heart, Contact } from 'lucide-react';
import Carousel from './Carousel';


import '../styles/Home.css';
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import Partner from './partner';
import ArticleBanner from './best-selling'; // Assurez-vous d'importer correctement ArticleBanner
import CompanyLocations from './location';
import WhatsappToggle from '../includes/whatsapp-toggle';
import { fetchData } from '../functions/product_data';


const HomePage = () => {
  const [articles, setArticles] = useState([]); // Declare articles state
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles on component mount
  useEffect(() => {
    fetchData(setArticles, setCategories, setSubCategories, setLoading);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
    
      <Navbar pageTitle="Accueil" description="Bienvenue sur Abrasif Italia, votre source de produits abrasifs de qualité supérieure." />
      
      <div className="container mx-auto ">
        {/* Carousel Section */}
        <Carousel />

        {/* Article Scrolling Banner */}
        <ArticleBanner articles={articles} categories={categories} subCategories={subCategories} /> 

        {/* Partner Section */}
        <Partner />

        {/* Company Locations */}
        <CompanyLocations />
        
      </div>
      <WhatsappToggle />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
