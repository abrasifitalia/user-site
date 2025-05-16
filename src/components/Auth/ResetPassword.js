import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import NavbarComponent from '../includes/navbar';
import Footer from '../includes/footer';
import Modal from '../includes/Modal';
import '../styles/auth.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  
  const [formData, setFormData] = useState({
    code: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({ show: false, message: '', variant: '' });

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setModalState({
        show: true,
        message: "Email manquant. Veuillez recommencer le processus.",
        variant: "danger"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setModalState({
        show: true,
        message: "Les mots de passe ne correspondent pas",
        variant: "danger"
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      setModalState({
        show: true,
        message: "Le mot de passe doit contenir au moins 8 caractères, une lettre, un chiffre et un caractère spécial",
        variant: "danger"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/client/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: formData.code,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setModalState({
          show: true,
          message: "Mot de passe réinitialisé avec succès",
          variant: "success"
        });
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setModalState({
          show: true,
          message: data.message || "Une erreur s'est produite",
          variant: "danger"
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        message: "Erreur de connexion au serveur",
        variant: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <NavbarComponent />
      <Container className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title text-center">Réinitialisation du mot de passe</h1>
          <p className="auth-subtitle text-center">
            Entrez le code reçu par email et votre nouveau mot de passe
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Code de vérification"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                pattern="\d{6}"
                maxLength="6"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <FiLock className="auth-input-icon" />
              <Form.Control
                type="password"
                placeholder="Nouveau mot de passe"
                className="auth-form-control"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <FiLock className="auth-input-icon" />
              <Form.Control
                type="password"
                placeholder="Confirmer le mot de passe"
                className="auth-form-control"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                  Réinitialisation...
                </>
              ) : (
                'Réinitialiser le mot de passe'
              )}
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
      <Modal 
        show={modalState.show}
        handleClose={() => setModalState({ ...modalState, show: false })}
        title={modalState.variant === 'success' ? 'Succès' : 'Erreur'}
        message={modalState.message}
        variant={modalState.variant}
      />
    </div>
  );
};

export default ResetPassword;
