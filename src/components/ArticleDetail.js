import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Navbar from './includes/navbar';
import Footer from './includes/footer';
import Loading from './includes/loading';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Helmet from 'react-helmet';
import OrderModal from './includes/Modal';
import { Link } from 'react-router-dom';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [modalState, setModalState] = useState({
        show: false,
        title: '',
        message: '',
        variant: ''
    });

    // Fetch article details when component mounts
    useEffect(() => {
        if (!id) {
            setError("L'ID de l'article est manquant.");
            setLoading(false);
            return;
        }

        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/article/article/get/${id}`);
                setArticle(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération de l\'article:', err);
                setError("Une erreur est survenue lors du chargement de l'article.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    // Handle order submission
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
            setModalState({
                show: true,
                title: "Avertissement",
                message: "Vous devez être connecté pour passer une commande.",
                variant: "warning",
                route: "article"
            });
            return;
        }

        const orderData = {
            clientId,
            items: [{ articleId: article._id, quantity: parseInt(quantity, 10) }],
        };

        setIsSubmitting(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/order/order`, orderData);
            setModalState({
                show: true,
                title: "Succès",
                message: "Commande passée avec succès ! Vous serez contacté pour confirmer.",
                variant: "success",
                route: "article"
            });
        } catch (error) {
            console.error("Erreur lors de la commande :", error.response?.data || error.message);
            setModalState({
                show: true,
                title: "Erreur",
                message: "Une erreur est survenue lors du passage de la commande. Veuillez réessayer plus tard.",
                variant: "danger",
                route: "article"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Display loading or error states
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    // Main render
    return (
        <div>
            <Navbar pageTitle={article?.name || 'Article'} />

            <div className="max-w-4xl    ">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden p-1 m-2 my-4">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold mb-2 text-danger">{article.name}</h1>
                        <div className="flex gap-2 mb-2">
                            <span className="px-3 py-1 bg-success text-gray-800 rounded rounded-full text-sm text-white">{article.category?.name}</span>
                            <span className="px-3 py-1 border border-gray-300 text-success rounded rounded-full text-sm">{article.subcategory?.name}</span>
                        </div>
                       <p className='mx-10 text-center font-semibold text-danger mb-0 bg-gray-50 p-2 rounded-lg shadow-sm  bg-body-tertiary border border-danger'>
                           <Link to={`/articles/${article._id}`} target="_blank" className='text-danger link-underline link-underline-opacity-0'>Télécharger la fiche technique</Link>
                       </p>  
                    </div>
                    <div className="p-6 space-y-6 pt-0">
                        <h3 className="text-lg font-semibold text-white bg-success rounded-lg p-2">Description</h3>
                        <p className="p-10 space-y-6">{article.description}</p>

                        {article.image && (
                            <div className="flex justify-center items-center my-6">
                                {imageLoading && <Loading />}
                                <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
                                    alt={article.name}
                                    className={`rounded-lg mx-auto block ${imageLoading ? 'hidden' : ''}`}
                                    style={{
                                        width: '200%', // Ensure the image occupies the full width available
                                        maxWidth: '250px', // Maximum limit for the image
                                        height: 'auto', // Automatically adjust height based on width
                                        objectFit: 'cover',
                                    }}
                                    loading="lazy"
                                    onLoad={() => setImageLoading(false)}
                                />
                            </div>
                        )}

                        {article.video && (
                            <div>
                                <h3 className="text-lg font-semibold">Vidéo</h3>
                                <video controls className="w-full h-auto object-contain rounded-lg shadow-md">
                                    <source src={`${process.env.REACT_APP_API_BASE_URL}${article.video}`} type="video/mp4" />
                                    Votre navigateur ne supporte pas la vidéo.
                                </video>
                            </div>
                        )}

                        {article.fonctionnalite && (
                            <div>
                                <h3 className="text-lg font-semibold text-white bg-success rounded-lg p-2">Fonctionnalités</h3>
                                <ul className="list-disc ml-5">
                                    {(Array.isArray(article.fonctionnalite) ? article.fonctionnalite : article.fonctionnalite.split(',')).map((feature, index) => (
                                        <li key={index} className="text-gray-700">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-6 flex items-center gap-4 row">
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="1"
                                className="px-4 py-2 border border-success text-danger text-lg font-semibold rounded-lg"
                            />
                            <button
                                onClick={handleOrder}
                                disabled={isSubmitting}
                                className={`bg-danger border border-danger text-white px-4 py-2 rounded-lg ${isSubmitting ? 'bg-success text-white cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading</> : " Demande de devis"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Notification modal */}
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
