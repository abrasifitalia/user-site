import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import './RegisterPage.css'; // Créez ce fichier CSS pour styliser la page d'enregistrement

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/api/client/client/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/articlel'); // Redirige vers la page de connexion après enregistrement
      } else {
        setError(data.message || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div> <Navbar/>
    <div className="register-container">
     
      <div className="register-card">
        <h2>Inscription</h2>
        <p className="register-subtitle">
          Entrez vos informations pour créer un compte
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Votre prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Votre nom"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Téléphone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="Votre téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
          <button
            type="submit"
            disabled={isLoading}
            className={`register-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? 'Création du compte...' : 'S’inscrire'}
          </button>
          </div>
        </form>
      </div>
      
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

export default Register;
