import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Search, Menu, Heart, Contact, Container } from 'lucide-react';
import Carousel from './carousels/Carousel';
import Produit from './carousels/produit'; // Assurez-vous d'importer le composant Carousel
import '../components/Home.css';
import Navbar from './includes/navbar';
import Footer from './includes/footer';
import Partner from './includes/partner';
import BestSelling from './includes/best-selling';
import CustomCarousel from './carousels/produit';

import CompanyLocations from './Home/location';


const HomePage = () => {
  const Style = {

  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
       
          
       
      </Container>
      <Navbar />
     


      {/* Carousel Section */}
      <Carousel /> {/* Intégration du composant Carousel */}

      

      {/* Partner */}
      <Partner />
       
        {/* Partner */}
        <CompanyLocations />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
