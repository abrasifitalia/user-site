import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Heart, Contact } from 'lucide-react';
import Carousel from './carousels/Carousel';
import Helmet from 'react-helmet'; // Import Helmet

import '../components/Home.css';
import Navbar from './includes/navbar';
import Footer from './includes/footer';
import Partner from './includes/partner';
import ArticleBanner from './includes/best-selling'; // Assurez-vous d'importer correctement ArticleBanner
import CompanyLocations from './Home/location';

const HomePage = () => {
  const [articles, setArticles] = useState([]); // Declare articles state

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/article/article`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data); // Set articles data
        } else {
          console.error('Error fetching articles:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
    
      <Navbar pageTitle="Accueil" />
      
      <div className="container mx-auto p-2">
        {/* Carousel Section */}
        <Carousel />

        {/* Article Scrolling Banner */}
        <ArticleBanner articles={articles} /> 

        {/* Partner Section */}
        <Partner />

        {/* Company Locations */}
        <CompanyLocations />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
