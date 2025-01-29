import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../includes/footer';
import { FiUser, FiMail, FiPhone, FiFileText, FiMessageCircle } from 'react-icons/fi';
import OrderModal from '../includes/Modal'; // Import the shared modal
import '../styles/contact.css'; // Import the new CSS file
import NavbarComponent from '../includes/navbar';
import SEO from '../utils/seo';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    phone: '',
    objet: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalVariant, setModalVariant] = useState('danger'); // 'danger' or 'success'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/message/message`, formData);
      setFormData({
        nom: '',
        email: '',
        phone: '',
        objet: '',
        message: ''
      });
      setModalTitle('Message Envoyé');
      setModalMessage('Votre message a été envoyé avec succès. Nous vous contacterons dans les plus brefs délais.');
      setModalVariant('success');
      setModalShow(true);
    } catch (err) {
      console.error(err);
      setModalTitle('Erreur');
      setModalMessage('Une erreur est survenue lors de l\'envoi de votre message.');
      setModalVariant('danger');
      setModalShow(true);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <SEO
      title="Contactez-nous"
      description="Contactez-nous pour toute question ou demande d'informations concernant nos produits et services."
      image="https://abrasifitalia.com/assets/logo-v1.png"
      keywords="contact, abrasifs tunisie, polissage tunisie, Klindex tunisie, équipement industriel tunisie, produits abrasifs professionnels, service client, assistance, demande d'information"
    />
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <NavbarComponent />
      <div className="contact-container">
        <div className="contact-card">
          <h1 className="contact-title">Contactez-nous</h1>
          <p className="contact-subtitle">Nous sommes là pour répondre à toutes vos questions.</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="contact-input-group">
              <FiUser className="contact-input-icon" size={25} />
              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                value={formData.nom}
                onChange={handleChange}
                className="contact-form-control"
                required
              />
            </div>

            <div className="contact-input-group">
              <FiMail className="contact-input-icon" size={25} />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                className="contact-form-control"
                required
              />
            </div>

            <div className="contact-input-group">
              <FiPhone className="contact-input-icon" size={25} />
              <input
                type="tel"
                name="phone"
                placeholder="Votre téléphone"
                value={formData.phone}
                onChange={handleChange}
                className="contact-form-control"
                required
              />
            </div>

            <div className="contact-input-group">
              <FiFileText className="contact-input-icon" size={25} />
              <input
                type="text"
                name="objet"
                placeholder="Objet"
                value={formData.objet}
                onChange={handleChange}
                className="contact-form-control"
                required
              />
            </div>

            <div className="contact-textarea-group">
              <FiMessageCircle className="contact-textarea-icon" size={25} />
              <textarea
                name="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="contact-textarea"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="contact-btn"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading
                </>
              ) : (
                'Envoyer Votre Message'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Shared OrderModal */}
      <OrderModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        title={modalTitle}
        message={modalMessage}
        variant={modalVariant}
      />

      <Footer />
    </div>
    </>
  );
};

export default ContactPage;