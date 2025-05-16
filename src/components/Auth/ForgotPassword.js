import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import NavbarComponent from '../includes/navbar';
import Footer from '../includes/footer';
import Modal from '../includes/Modal';
import '../styles/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/client/request-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setModalState({
          show: true,
          message: "Un code de vérification a été envoyé à votre adresse email",
          variant: "success"
        });
        // Navigate to reset password page after 3 seconds
        setTimeout(() => {
          navigate('/reset-password', { state: { email } });
        }, 3000);
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
          <h1 className="auth-title text-center">Mot de passe oublié</h1>
          <p className="auth-subtitle text-center">
            Entrez votre email pour recevoir un code de réinitialisation
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4 position-relative">
              <FiMail className="auth-input-icon" />
              <Form.Control
                type="email"
                placeholder="Adresse email"
                className="auth-form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  Envoi en cours...
                </>
              ) : (
                'Envoyer le code'
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

export default ForgotPassword;
