import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import Modal from '../includes/Modal'; // Import the Modal component

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Extract redirectPath from the URL query string
  const searchParams = new URLSearchParams(window.location.search);
  const redirectPathFromQuery = searchParams.get('redirectPath');

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
        localStorage.setItem('clientName', data.clientName);
        localStorage.setItem('clientId', data.clientId);
        localStorage.setItem('token', data.token);

        // Call login function from Auth context
        login({
          clientName: data.clientName,
          clientId: data.clientId,
          token: data.token,
        });

        // Navigate to the specified redirect path or fallback to /article
        const redirectPath = redirectPathFromQuery || data.redirectPath || '/article';
        navigate(redirectPath);
      } else {
       
        setModalVisible(true); // Show modal on error
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      setModalVisible(true); // Show modal on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Navbar pageTitle="Connexion" description="Connectez-vous à votre compte client pour accéder à nos produits et services." />
      <div className="max-w-4xl mx-auto px-6 py-24 shadow-2xl">
        <h1 className="text-center text-4xl font-extrabold text-success">Connexion</h1>
        <p className="text-center text-danger mb-4">Bienvenue cher client</p>
        <div className="bg-gray-100 shadow-2xl rounded-lg mx-4">
          <form onSubmit={handleSubmit} className="space-y-8 p-4">
            <div className="relative mb-8">
              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1"
                size={25}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 w-full pl-12 py-4 text-danger font-semibold border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>

            <div className="relative mb-8">
              <FiLock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1"
                size={25}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="p-3 w-full pl-12 py-4 text-danger font-semibold border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center p-8">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-checkbox h-5 w-5 text-success"
                />
                <label htmlFor="rememberMe" className="ml-2 text-success p-8">
                  Se souvenir de moi
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-success text-white border border-success hover:bg-blue-600 font-semibold py-2 mx-2 rounded-lg transition-colors duration-200 text-lg mt-12"
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
          <p className="text-center text-danger py-4">
            vous n'avez pas de compte ?{' '}
            <Link to="/register" className="text-success">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <Modal 
        show={modalVisible} 
        handleClose={() => setModalVisible(false)} 
        title="problème de connexion" 
        message={error} 
        variant="danger" 
        route="login"
      />
    </div>
  );
};

export default Login;
