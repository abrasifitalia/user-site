import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../components/Home.css';
import Navbar from './navbar';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    phone: '',
    objet: '',
    message: '' 
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.API_BASE_URL}/api/message/message`, formData);
      setFormData({
        nom: '',
        email: '',
        phone: '',
        objet: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Navbar/>
      <h1 className="text-center text-4xl font-bold mb-3">Contactez-nous</h1>
      <p className="text-center text-gray-600 mb-8">Nous sommes là pour vous aider</p>
<div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors bg-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors bg-white"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Votre téléphone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors bg-white"
          required
        />

        <input
          type="text"
          name="objet"
          placeholder="Objet"
          value={formData.objet}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors bg-white"
          required
        />

        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors bg-white resize-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-normal py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>

        <br>
        </br>
      </form>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12"></div>
</div>
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
              <li>+21620235829</li>
              <li>     +21658982743</li>
              <li>+21655888111</li>
             
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

export default ContactPage;