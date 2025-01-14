import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../components/Home.css';
import Navbar from './includes/navbar';
import Footer from './includes/footer';

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
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/message/message`, formData);
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-24"> {/* Adjusted padding to py-24 for better spacing with the navbar */}
        <h1 className="text-center text-4xl font-bold mb-3">Contactez-nous</h1>
        <p className="text-center text-gray-600 mb-8">Nous sommes là pour vous aider</p>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="nom"
              placeholder="Votre nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-gray-100"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-gray-100"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Votre téléphone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-gray-100"
              required
            />

            <input
              type="text"
              name="objet"
              placeholder="Objet"
              value={formData.objet}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-gray-100"
              required
            />

            <textarea
              name="message"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-gray-100 resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;