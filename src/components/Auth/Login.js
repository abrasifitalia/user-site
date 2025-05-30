import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../includes/footer';
import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import Modal from '../includes/Modal';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/auth.css';
import SEO from '../utils/seo';
import NavbarComponent from '../includes/navbar';
import { API_ENDPOINTS } from '../../config/api';
import EmailVerification from './EmailVerification';

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [needsVerification, setNeedsVerification] = useState(false);
    const navigate = useNavigate();

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
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${API_ENDPOINTS.login}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.needsVerification) {
                setNeedsVerification(true);
            } else if (response.ok) {
                localStorage.setItem('clientName', data.clientName);
                localStorage.setItem('clientId', data.clientId);
                localStorage.setItem('token', data.token);

                login({
                    clientName: data.clientName,
                    clientId: data.clientId,
                    token: data.token,
                });

                const redirectPath = redirectPathFromQuery || data.redirectPath || '/articles';
                navigate(redirectPath);
            } else {
                setError(data.message || 'Erreur de connexion');
                setModalVisible(true);
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
            setModalVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (needsVerification) {
        return (
            <div className="min-vh-100 bg-light">
                <NavbarComponent />
                <Container className="auth-container">
                    <div className="auth-card">
                        <EmailVerification 
                            email={formData.email}
                            onSuccess={(data) => {
                                if (data?.token) {
                                    // Auto-login if token is provided
                                    login({
                                        clientName: data.clientName,
                                        clientId: data.clientId,
                                        token: data.token
                                    });
                                    const redirectPath = redirectPathFromQuery || '/articles';
                                    navigate(redirectPath);
                                } else {
                                    // Otherwise just redirect to login
                                    setNeedsVerification(false);
                                    navigate('/login');
                                }
                            }}
                        />
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }

    return (
         <>
    <SEO
      title="Connexion"
      description="Connectez-vous à votre compte client"
      image="https://abrasifitalia.com/assets/logo-v1.png"
      keywords="abrasifs tunisie,  polissage tunisie, Klindex tunisie, équipement industriel tunisie, produits abrasifs professionnels, matériel de polissage, fournitures industrielles, ponceuse, disques abrasifs, pâte à polir, showroom Ariana, showroom Sousse, showroom L'Aouina , produit de nettoyage , chariot de nettoyage , machine de nettoyage en tunisie , hyper grinder tunisie , machine de polissage en tunisie"

    />
        <div className="min-vh-100 bg-light">
            <NavbarComponent 
            />

            <Container className="auth-container">
                <div className="auth-card">
                    <h1 className="auth-title text-center">Connexion</h1>
                    <p className="auth-subtitle text-center">Bienvenue cher client</p>

                    <Form onSubmit={handleSubmit}>
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
                        <div className="d-flex justify-content-between mb-4">
                            <Form.Check 
                                type="checkbox" 
                                label="Se souvenir de moi" 
                                className="text-success"
                            />
                            <Link to="/forgot-password" className="auth-link">
                                Mot de passe oublié?
                            </Link>
                        </div>

                        <Button 
                            type="submit" 
                            className="auth-btn w-100"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" />
                                    Connexion...
                                </>
                            ) : (
                                'Se connecter'
                            )}
                        </Button>
                    </Form>

                    <p className="text-center mt-4 text-muted">
                        Pas de compte ?{' '}
                        <Link to="/register" className="auth-link">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </Container>

            <Footer />
            <Modal 
                show={modalVisible} 
                handleClose={() => setModalVisible(false)} 
                title="Problème de connexion" 
                message="Merci de vérifier vos informations de connexion" 
                variant="danger" 
            />
        </div>
        </>
    );
};

export default Login;