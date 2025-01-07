import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Search, Menu, Heart } from 'lucide-react';
import Carousel from './carousels/Carousel';
import Produit from'./carousels/produit'; // Assurez-vous d'importer le composant Carousel
import '../components/Home.css';
import Navbar from './navbar';

const HomePage = () => {
  const Style = {

    };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Ajoutez ici votre contenu */}
            </div>
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <Carousel /> {/* Intégration du composant Carousel */}

    

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
      
      <h3 className="text-2xl font-semibold mb-8 text-center">NOTRE ARTICLES</h3>
      <Produit />
      
       
      </div>

      {/* Newsletter */}
      <div className="bg-gray-100 py-12">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-semibold mb-4">Notre Marques</h3>
      <p className="text-gray-600 mb-6">Découvrez nos partenaires et marques de qualité.</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      <div className="flex justify-center">
        <img
          src="/assets/hg.png"
          alt="Brand 1"
          className="w-full h-48 object-contain"
        />
      </div>
      <div className="flex justify-center">
        <img
          src="/assets/mixer.png"
          alt="Brand 2"
          className="w-full h-48 object-contain"
        />
      </div>
      <div className="flex justify-center">
        <img
          src="/assets/uctem.png"
          alt="Brand 3"
          className="w-full h-48 object-contain"
        />
      </div>
      <div className="flex justify-center">
        <img
          src="/assets/Capture d'écran 2024-12-12 155506.png"
          alt="Brand 4"
          className="w-full h-48 object-contain"
        />
      </div>
    </div>
  </div>
</div>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Contactez</h4>
            <p className="text-gray-400">Nous sommes là pour répondre à toutes vos questions et vous aider dans vos projets</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos locaux</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Arian: croisement la Soukra</li>
              <li>Sousse: Bouhssina Cité Boukhzar Sousse</li>
              <li>L'aouina: AV. Mongi Slim-Laouina</li>
              
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Téléphone</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+21620235829 +21655888111</li> 
              <li>     +21658982743  +21694615025</li> <br></br>
              <li>+21692026323</li>
              
              
              
             
             
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Réseaux sociaux</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Instagram
              Abrasif Italia Klindex</li>
              <li>Email
              abrasif.italia3@gmail.com</li>
              <li>Facebook
              Abrasif Italia Klindex
           </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
