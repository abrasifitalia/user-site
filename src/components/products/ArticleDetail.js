import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../includes/footer';
import Loading from '../utils/loading';
import OrderModal from '../includes/Modal';
import ShareFeatures from '../includes/share';
import SimilarProducts from './similair-products';
import { fetchArticleById } from '../functions/product_data';
import '../styles/product_details.css';
import { handleOrder } from '../functions/make_order';
import { MdOutlineZoomIn } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import NavbarComponent from '../includes/navbar';
import SEO from '../utils/seo';
import { handleManualQuote } from '../functions/manual_quote';

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
  const [isZoomed, setIsZoomed] = useState(false); // State for zoomed image modal
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (!id) {
      setError("L'ID de l'article est manquant.");
      setLoading(false);
      return;
    }
    fetchArticleById(id, setArticle, setLoading, setError);
  }, [id]);

  const makeOrder = async (article_id, article_quantity, category, subCategory) => {
    const clientId = localStorage.getItem('clientId');
    await handleOrder(clientId, article_id, article_quantity, category, subCategory, setIsSubmitting, navigate, setModalState);
  };

  const handleInputClick = (e) => {
    e.stopPropagation(); // Stop event propagation
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed); // Toggle zoom modal
  };

  const handleQuoteOption = () => {
    const clientId = localStorage.getItem('clientId');
    if (clientId) {
      makeOrder(article._id, quantity, article.category?.name, article.subcategory?.name);
    } else {
      setShowQuoteModal(true);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const quoteData = {
      ...quoteForm,
      articleId: article._id,
      quantity: quantity,
      articleName: article.name,
      category: article.category?.name,
      subCategory: article.subcategory?.name
    };

    const success = await handleManualQuote(quoteData, setIsSubmitting, setModalState);
    if (success) {
      setShowQuoteModal(false);
      setQuoteForm({ name: '', email: '', phone: '' });
    }
  };

  const renderOrderSection = () => (
    <div className="order-section">
      <button
        onClick={handleQuoteOption}
        disabled={isSubmitting}
        className={`order-button ${isSubmitting ? 'loading' : ''}`}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Chargement...
          </>
        ) : (
          <>
            <i className="fas fa-file-alt"></i> Demande de devis
            <div className="quantity-input">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                max="10"
                className="quantity-field"
                onClick={handleInputClick}
              />
              <span className="quantity-label">pcs</span>
            </div>
          </>
        )}
      </button>

      {/* Manual Quote Modal */}
      {showQuoteModal && (
        <div className="modal-overlay" onClick={() => setShowQuoteModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Demande de devis</h2>
            <div className="modal-options">
              <button 
                className="login-option"
                onClick={() => navigate(`/login?redirectPath=${encodeURIComponent(window.location.pathname)}`)}
              >
                Se connecter
              </button>
              <div className="or-divider">OU</div>
              <form onSubmit={handleManualSubmit} className="quote-form">
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={quoteForm.name}
                  onChange={e => setQuoteForm({...quoteForm, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={quoteForm.email}
                  onChange={e => setQuoteForm({...quoteForm, email: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Numéro de téléphone"
                  value={quoteForm.phone}
                  onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})}
                  required
                />
                <button type="submit" disabled={isSubmitting}>
                  Envoyer la demande
                </button>
              </form>
            </div>
            <button className="modal-close" onClick={() => setShowQuoteModal(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
    <SEO
      title={article?.name}
      description={`Découvrez l'article ${article?.name} - Abrasif Italia`}
      image={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
      keywords="abrasif tunisie , chariot de nettoyage tunisie , produit de nettoyage , polissage , poncage , segment cassani , segmant frankfurt , lustrage , hypergrinder tunisie , klindex tunisie"
    />
    <div className="article-detail-page">
      <NavbarComponent
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
            <div className="image-wrapper">
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
                alt={article.name}
                className="article-image"
                loading="lazy"
              />
              <button onClick={handleZoom} className="zoom-button">
                <MdOutlineZoomIn aria-hidden="true" title="Zoom in" className='text-xl' ></MdOutlineZoomIn>
              </button>
            </div>
          </div>
          <div className="article-info">
            <div className="article-description">
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
                <FaFileDownload className='text-xl' ></FaFileDownload> Télécharger la fiche technique
              </a>
            )}
            {article.video && (
              <div className="article-video">
                <video controls className="video-player" autoPlay loading="lazy">
                  <source src={`${process.env.REACT_APP_API_BASE_URL}${article.video}`} type="video/mp4" />
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              </div>
            )}
            {article.fonctionnalite && (
              <div className="article-features">
             {/* <h3 className="section-title">Fonctionnalités</h3> */}
                <ul className="features-list">
                  {(Array.isArray(article.fonctionnalite) ? article.fonctionnalite : article.fonctionnalite.split('\r\n')).map((feature, index) => (
                    <React.Fragment key={index}>
                      <li className="feature-item">
                        <i className="fas fa-check-circle"></i> <span>{feature.trim()}</span>
                      </li>
                      <hr />
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            )}
            {renderOrderSection()}
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
      {/* Zoom Modal */}
      {isZoomed && (
        <div className="zoom-modal" onClick={handleZoom}>
          <div className="zoom-modal-content">
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
              alt={article.name}
              className="zoomed-image"
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ArticleDetail;