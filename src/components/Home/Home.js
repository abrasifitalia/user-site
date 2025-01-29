import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';


import '../styles/Home.css';
import Footer from '../includes/footer';
import Partner from './partner';
import ArticleBanner from './best-selling'; // Assurez-vous d'importer correctement ArticleBanner
import CompanyLocations from './location';
import { fetchData } from '../functions/product_data';
import NavbarComponent from '../includes/navbar';
import SEO from '../utils/seo';
import WhatsappToggle from '../utils/whatsapp-toggle';


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
    <>
      <SEO
        title="N°1 des Produits Abrasifs et Équipements de Polissage en Tunisie"
        description="✓ Large gamme de produits abrasifs professionnels ✓ Distributeur officiel Klindex ✓ Prix compétitifs ✓ Livraison rapide ✓ Expertise technique ✓ Service après-vente"
        image="https://abrasifitalia.com/assets/logo-v1.png"
        keywords="abrasifs tunisie, polissage tunisie, Klindex tunisie, équipement industriel tunisie, produits abrasifs professionnels, matériel de polissage, fournitures industrielles, ponceuse, disques abrasifs, pâte à polir, showroom Ariana, showroom Sousse, showroom L'Aouina , produit de nettoyage , chariot de nettoyage , machine de nettoyage en tunisie , hyper grinder tunisie , machine de polissage en tunisie"
      />
    <div className="min-h-screen bg-gray-50">
     
      <NavbarComponent />
      
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
    </>
  );
};

export default HomePage;
