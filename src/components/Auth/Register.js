import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Footer from '../includes/footer';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import Modal from '../includes/Modal';
import '../styles/auth.css';
import SEO from '../utils/seo';
import NavbarComponent from '../includes/navbar';

const Register = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || "Erreur lors de la création du compte");
        setModalVisible(true);
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <>
    <SEO
      title="Inscription"
      description="Créez votre compte client pour accéder à nos produits et services."
      image="https://abrasifitalia.com/assets/logo-v1.png"
      keywords="abrasifs tunisie,  polissage tunisie, Klindex tunisie, équipement industriel tunisie, produits abrasifs professionnels, matériel de polissage, fournitures industrielles, ponceuse, disques abrasifs, pâte à polir, showroom Ariana, showroom Sousse, showroom L'Aouina , produit de nettoyage , chariot de nettoyage , machine de nettoyage en tunisie , hyper grinder tunisie , machine de polissage en tunisie"

    />
    <div className="min-vh-100 bg-light">
      <NavbarComponent
      />


      <Container className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title text-center">Inscription</h1>
          <p className="auth-subtitle text-center">Créez votre compte client</p>
          <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-4 position-relative">
    <FiUser className="auth-input-icon" />
    <Form.Control
      type="text"
      name="firstName"
      placeholder="Prénom"
      className="auth-form-control"
      value={formData.firstName}
      onChange={handleChange}
      required
    />
  </Form.Group>

  <Form.Group className="mb-4 position-relative">
    <FiUser className="auth-input-icon" />
    <Form.Control
      type="text"
      name="lastName"
      placeholder="Nom"
      className="auth-form-control"
      value={formData.lastName}
      onChange={handleChange}
      required
    />
  </Form.Group>

  <Form.Group className="mb-4 position-relative">
  <div className="auth-input-icon-container">
    <FiPhone className="auth-input-icon" />
  </div>
  <Form.Control
    type="tel"
    name="phone"
    placeholder="+216 XX XXX XXX"
    className="auth-form-control ps-5" // Ajout de padding à gauche
    value={formData.phone}
    onChange={(e) => {
      const input = e.target.value;
      const cleaned = input.replace(/\D/g, ''); // Supprime tout sauf les chiffres
      
      // Garde le +216 fixe
      const prefix = '+216';
      let numbers = cleaned.startsWith('216') ? cleaned.slice(3) : cleaned;
      
      // Limite à 8 chiffres après le préfixe
      numbers = numbers.substring(0, 8);
      
      // Formatage avec espacements
      let formatted = prefix;
      if (numbers.length > 0) {
        formatted += ` ${numbers.slice(0, 2)}`;
        if (numbers.length > 2) formatted += ` ${numbers.slice(2, 5)}`;
        if (numbers.length > 5) formatted += ` ${numbers.slice(5, 8)}`;
      }

      setFormData({
        ...formData,
        phone: formatted,
        phoneError: numbers.length === 8 ? null : 'Numéro incomplet'
      });
    }}
    onKeyDown={(e) => {
      // Permet la suppression arrière
      if (e.key === 'Backspace') {
        const current = formData.phone.replace(/\D/g, '');
        const newValue = current.slice(0, -1);
        setFormData({
          ...formData,
          phone: '+216' + (newValue.length > 3 ? newValue.slice(3) : ''),
          phoneError: null
        });
      }
    }}
    pattern="^\+216\s?\d{2}\s?\d{3}\s?\d{3}$"
    required
  />
  {formData.phoneError && (
    <Form.Text className="text-danger mt-1 d-block">
      {formData.phoneError}
    </Form.Text>
  )}
</Form.Group>

  <Form.Group className="mb-4 position-relative">
    <FiMail className="auth-input-icon" />
    <Form.Control
      type="email"
      name="email"
      placeholder="Adresse email"
      className="auth-form-control"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </Form.Group>

  <Form.Group className="mb-4 position-relative">
    <FiLock className="auth-input-icon" />
    <Form.Control
      type="password"
      name="password"
      placeholder="Mot de passe"
      className="auth-form-control"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </Form.Group>

            <Button 
              type="submit" 
              className="auth-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Inscription...
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </Form>

          <p className="text-center mt-4 text-muted">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="auth-link">
              Connectez-vous
            </Link>
          </p>
        </div>
      </Container>

      <Footer />
      <Modal 
        show={modalVisible} 
        handleClose={() => setModalVisible(false)} 
        title="Problème de création de compte" 
        message="Merci de vérifier vos informations de création de compte" 
        variant="danger" 
      />
    </div>
    </>
  );
};


export default Register;