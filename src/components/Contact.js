import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './includes/navbar';
import Footer from './includes/footer';
import { FiUser, FiMail, FiPhone, FiFileText, FiMessageCircle } from 'react-icons/fi';
import CompanyLocations from './Home/location';
import Helmet from 'react-helmet';
import { Modal, Button } from 'react-bootstrap'; // Importing Modal and Button

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    phone: '',
    objet: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
 
  const [modalShow, setModalShow] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message

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
      setModalMessage('Votre message a été envoyé avec succès.'); // Set success message
      setModalShow(true); // Show modal on success
    } catch (err) {
      console.error(err);
      setModalMessage('Une erreur est survenue lors de l\'envoi de votre message.'); // Set error message
      setModalShow(true); // Show modal on error
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
       
      <Navbar pageTitle="Contactez-nous" description="Contactez-nous pour toute question ou demande d'informations." />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-center text-4xl font-extrabold text-success ">Contactez-nous</h1>
        <p className="text-center text-danger  mb-4">Nous sommes là pour répondre à toutes vos questions.</p>
        <div className="bg-gray-100 shadow-2xl rounded-lg mx-4">
          <form onSubmit={handleSubmit} className="space-y-8 p-4">
            <div className="relative mb-8">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full p-3 pl-12 py-4 text-danger font-semibold  border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>

            <div className="relative mb-8">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 pl-12 py-4 text-danger font-semibold  border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>

              <div className="relative mb-8">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
              <input
                type="tel"
                name="phone"
                placeholder="Votre téléphone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 pl-12 py-4 text-danger font-semibold border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>

            <div className="relative mb-8">
              <FiFileText className="absolute left-4 top-1/2 -translate-y-1/2 text-danger pt-2 p-1" size={25} />
              <input
                type="text"
                name="objet"
                placeholder="Objet"
                value={formData.objet}
                onChange={handleChange}
                className="w-full p-3 pl-12 py-4 text-danger font-semibold border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50"
                required
              />
            </div>

            <div className="relative mb-8">
              <FiMessageCircle className="absolute left-4 top-6 text-danger pt-2 p-1" size={25} />
              <textarea
                name="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full p-3 pl-12 py-4 p-2 text-danger font-semibold  border border-danger rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-50 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-success text-white border border-success hover:bg-blue-600  font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
             {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading
        </>
      ) : (
        'Envoyer Votre Message '
      )}
            </button>
          </form>
        </div>
      </div>

      {/* Custom Modal for success/error message */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>{modalMessage.includes('succès') ? 'Message Envoyé' : 'Erreur'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font-semibold'>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='bg-danger text-white' onClick={() => setModalShow(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default ContactPage;
