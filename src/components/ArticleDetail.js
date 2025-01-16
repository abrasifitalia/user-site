import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Navbar from './includes/navbar';
import Footer from './includes/footer';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les détails de l'article
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

  // Gestion de la commande
  const handleOrder = async () => {
    if (quantity <= 0) {
      alert("La quantité doit être supérieure à 0.");
      return;
    }

    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      alert("Vous devez être connecté pour passer une commande.");
      return;
    }

    const orderData = {
      clientId,
      items: [{ articleId: article._id, quantity: parseInt(quantity, 10) }],
    };

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/order/order`, orderData);
      alert("Commande passée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la commande :", error.response?.data || error.message);
      alert("Une erreur est survenue lors du passage de la commande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Affichage des états de chargement ou d'erreur
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Rendu principal
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold mb-2">{article.name}</h1>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{article.category?.name}</span>
              <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full text-sm">{article.subcategory?.name}</span>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600">{article.description}</p>

            {article.image && (
              <div>
                <h3 className="text-lg font-semibold">Images</h3>
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
                  alt={article.name}
                  className="rounded-lg shadow-md mx-auto block w-full md:w-[500px] h-[300px] md:h-[400px]"
                  style={{
                    objectFit: 'contain',
                    backgroundColor: '#f0f0f0',
                    margin: '0 auto'
                  }}
                  loading="lazy"
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
                <h3 className="text-lg font-semibold">Fonctionnalités</h3>
                <ul className="list-disc ml-5">
                  {(Array.isArray(article.fonctionnalite) ? article.fonctionnalite : article.fonctionnalite.split(',')).map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleOrder}
                disabled={isSubmitting}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md animate-pulse ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? "Commande en cours..." : "Passer commande"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
