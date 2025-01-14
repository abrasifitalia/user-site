import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './includes/navbar';
import '../components/LoginPage.css';
import Footer from './includes/footer';


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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/client/client/login`, {
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
        navigate('/article');
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
      <Footer />
    </div>
  );
};

export default Login;
