import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import Loading from '../includes/loading';
import OrderModal from '../includes/Modal';
import ShareFeatures from '../includes/share';
import SimilarProducts from './similair-products';
import { fetchArticleById } from '../functions/product_data';
import '../styles/product_details.css';

const ArticleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({
    show: false,
    title: '',
    message: '',
    variant: ''
  });

  useEffect(() => {
    if (!id) {
      setError("L'ID de l'article est manquant.");
      setLoading(false);
      return;
    }
    fetchArticleById(id, setArticle, setLoading, setError);
  }, [id]);

  const handleOrder = async () => {
    if (quantity <= 0) {
      setModalState({
        show: true,
        title: "Problème",
        message: "La quantité doit être supérieure à 0.",
        variant: "danger",
        route: "article"
      });
      return;
    }

    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      const redirectPath = `/articles/${article._id}`;
      navigate(`/login?redirectPath=${encodeURIComponent(redirectPath)}`);
    }

    const orderData = {
      clientId,
      items: [{ articleId: article._id, quantity: parseInt(quantity, 10) }],
    };

    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/order/order`, orderData);
      setModalState({
        show: true,
        title: "Succès",
        message: "Demande de devis envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.",
        variant: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la commande :", error.response?.data || error.message);
      setModalState({
        show: true,
        title: "Erreur",
        message: "Un problème est survenue lors de l'envoi de la demande de devis. Veuillez réessayer plus tard.",
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputClick = (e) => {
    e.stopPropagation(); // Stop event propagation
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="article-detail-page">
      <Navbar
        pageTitle={article?.name || 'Article'}
        description={`Découvrez l'article ${article?.name} - Abrasif Italia`}
        ImgUrl={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
        keywords={`${article.category?.name} ${article.subcategory?.name} ${article.name}`}
      />
      <div className="article-detail-container">
        <div className="article-header">
          <h1 className="article-title">{article.name}</h1>
          <div className="article-category">
            <span>{article.category?.name}</span>
            <span> | </span>
            <span>{article.subcategory?.name}</span>
          </div>
          <ShareFeatures link={`https://abrasifitalia.com/articles/${article.category?.name}/${article.subcategory?.name}/${article._id}`} />
        </div>
        <div className="article-content">
          <div className="article-image-section">
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
              alt={article.name}
              className="article-image"
              loading="lazy"
            />
          </div>
          <div className="article-info">
            <div className="article-description">
              <h3 className="section-title">Description</h3>
              <p className="description-text">
                {article.description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            {article.ficheTechnique && (
              <a
                href={`${process.env.REACT_APP_API_BASE_URL}${article.ficheTechnique}`}
                download
                className="download-link"
              >
                Télécharger la fiche technique
              </a>
            )}
            {article.video && (
              <div className="article-video">
                <h3 className="section-title">Vidéo</h3>
                <video controls className="video-player" loading="lazy">
                  <source src={`${process.env.REACT_APP_API_BASE_URL}${article.video}`} type="video/mp4" />
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              </div>
            )}
            {article.fonctionnalite && (
              <div className="article-features">
                <h3 className="section-title">Fonctionnalités</h3>
                <ul className="features-list">
                  {(Array.isArray(article.fonctionnalite) ? article.fonctionnalite : article.fonctionnalite.split('\r\n')).map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span>{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="order-section">
              <button
                onClick={handleOrder}
                disabled={isSubmitting}
                className={`order-button ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Loading
                  </>
                ) : (
                  <>
                    Demande de devis :
                    <div className="quantity-input">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        max="10"
                        className="quantity-field"
                        onClick={handleInputClick} // Add this line
                      />
                      <span className="quantity-label">pcs</span>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <SimilarProducts categoryId={article.category?._id} subCategoryId={article.subcategory?._id} />
      </div>
      <Footer />
      <OrderModal
        show={modalState.show}
        handleClose={() => setModalState({ ...modalState, show: false })}
        title={modalState.title}
        message={modalState.message}
        variant={modalState.variant}
        route={modalState.route}
      />
    </div>
  );
};

export default ArticleDetail;