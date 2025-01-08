import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar';
import '../components/LoginPage.css';

const Login = () => {
  const { login } = useAuth();  // Récupérer la fonction de connexion du contexte
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/api/client/client/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Appeler la fonction login du contexte avec les données du client
        login({
          clientName: data.clientName,
          clientId: data.clientId,
          token: data.token,
        });
        navigate('/articlel');
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
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Connexion</h2>
          <p className="login-subtitle">Bienvenue cher client</p>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

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

            <button type="submit" disabled={isLoading} className={`login-button ${isLoading ? 'loading' : ''}`}>
              {isLoading ? <div className="spinner"></div> : 'Se connecter'}
            </button>
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

export default Login;
