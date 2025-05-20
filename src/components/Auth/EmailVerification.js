import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/api';
import Modal from '../includes/Modal';
import NavbarComponent from '../includes/navbar';
import Footer from '../includes/footer';

const EmailVerification = ({ email, onSuccess }) => {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${API_ENDPOINTS.verifyEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalState({
          show: true,
          message: "Email vérifié avec succès!",
          variant: "success"
        });
        
        if (data.token) {
          // If we get a token, perform auto-login
          localStorage.setItem('clientName', data.clientName);
          localStorage.setItem('clientId', data.clientId);
          localStorage.setItem('token', data.token);
          
          // Navigate to articles page after successful verification and auto-login
          setTimeout(() => navigate('/articles'), 2000);
        } else {
          // If no token, redirect to login
          setTimeout(() => navigate('/login'), 2000);
        }
      } else {
        setModalState({
          show: true,
          message: data.message || "Code incorrect",
          variant: "danger"
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        message: "Erreur de connexion",
        variant: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimer(120);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${API_ENDPOINTS.resendVerification}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalState({
          show: true,
          message: "Nouveau code envoyé!",
          variant: "success"
        });
      } else {
        setModalState({
          show: true,
          message: data.message || "Erreur lors de l'envoi",
          variant: "danger"
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        message: "Erreur de connexion",
        variant: "danger"
      });
    }
  };

  return (
    <Container className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title text-center">Vérification Email</h2>
        <p className="auth-subtitle text-center">
          Un code de vérification a été envoyé à {email}
        </p>

        <Form onSubmit={handleVerify}>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Entrez le code à 6 chiffres"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="auth-form-control text-center"
              required
              pattern="\d{6}"
            />
          </Form.Group>

          <Button 
            type="submit" 
            className="auth-btn w-100"
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Vérification...
              </>
            ) : (
              'Vérifier'
            )}
          </Button>

          <div className="text-center mt-3">
            <Button
              variant="link"
              onClick={handleResend}
              disabled={!canResend}
              className="auth-link"
            >
              {canResend ? 'Renvoyer le code' : `Renvoyer le code (${Math.floor(timer/60)}:${(timer%60).toString().padStart(2, '0')})`}
            </Button>
          </div>
        </Form>
      </div>

      <Modal
        show={modalState.show}
        handleClose={() => setModalState({ ...modalState, show: false })}
        title={modalState.variant === 'success' ? 'Succès' : 'Erreur'}
        message={modalState.message}
        variant={modalState.variant}
      />
    </Container>
  );
};

export default EmailVerification;
