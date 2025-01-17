import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import Helmet from 'react-helmet';

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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/client/client/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
  
      <Navbar pageTitle="Inscription" />
      <div className="max-w-4xl mx-auto px-6 py-24 p-50 shadow-2xl">
        <h1 className="text-center text-4xl font-extrabold text-success mb-4">Inscription</h1>
        <p className="text-center text-danger mb-10">Créez votre compte client</p>
        <div className="bg-gray-100 shadow-2xl rounded-lg p-10">
        {error && <p className="text-danger text-center mb-6">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-8 p-4">
            <div className="relative mb-8">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={handleChange}
                className="p-3 w-full pl-12 py-4 text-danger font-semibold border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>

            <div className="relative mb-8">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Votre nom"
                value={formData.lastName}
                onChange={handleChange}
                className="p-3 w-full pl-12 py-4 text-danger font-semibold border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>

            <div className="relative mb-8">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Votre téléphone"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 w-full pl-12 py-4 text-danger font-semibold border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>

            <div className="relative mb-8">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
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
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-success text-white border border-success hover:bg-blue-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              {isLoading ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading</> : "S'inscrire"}
            </button>
          </form>
          <p className="text-center text-danger ">Vous avez déjà un compte ? <Link to="/login" className="text-success">Connectez-vous</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
