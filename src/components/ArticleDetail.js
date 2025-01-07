import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from "lucide-react";
import Navbar from "./navbar";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("L'ID de l'article est manquant.");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:5000/api/article/article/get/${id}`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Une erreur est survenue lors du chargement de l'article.");
        setLoading(false);
      });
  }, [id]);

  const handleOrder = async () => {
    if (quantity <= 0) {
      alert("La quantité doit être supérieure à 0");
      return;
    }

    if (!article || !article._id) {
      alert("L'article n'a pas pu être trouvé.");
      return;
    }

    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      alert("Vous devez être connecté pour passer une commande.");
      return;
    }

    const orderData = {
      clientId,
      items: [
        {
          articleId: article._id,
          quantity: parseInt(quantity, 10)
        }
      ]
    };

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/order/order", orderData);
      console.log("Réponse API :", response.data);
      alert("Commande passée avec succès !");
    } catch (error) {
      console.error("Erreur API :", error.response?.data || error.message);
      alert("Une erreur est survenue lors du passage de la commande.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{article.name}</h1>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {article.category.name}
                  </span>
                  <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full text-sm">
                    {article.subcategory.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-xl font-bold text-green-600 {article.price}">
             
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{article.description}</p>
            </div>

            {article.image && (
              <div className="my-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Images</h3>
                <div className=" text-center">
                  <img
                    src={`http://localhost:5000${article.image}`}
                    alt={article.name}
                    className="w-85 h-85 object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}

            {article.video && (
              <div className="my-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Vidéo</h3>
                <div className="text-center">
                <video controls className="w-85 h-85 object-contain rounded-lg shadow-md">
                              <source
                                src={`http://localhost:5000${article.video}`}
                                type="video/mp4"
                              />
                              Votre navigateur ne supporte pas la vidéo.
                            </video>
                </div>
              </div>
            )}

            {article.fonctionnalite && (
              <div className="my-6">
                <h3 className="text-lg font-semibold mb-2">Fonctionnalités</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(Array.isArray(article.fonctionnalite) ? article.fonctionnalite : article.fonctionnalite.split(',')).map((feature, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded-md text-gray-700">
                      {feature}
                    </div>
                  ))}
                </div>
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
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? "Commande en cours..." : "Passer commande"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Contactez</h4>
            <p className="text-gray-400">Nous sommes là pour répondre à toutes vos questions et vous aider dans vos projets</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos locaux</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Arian: croisement la Soukra</li>
              <li>Sousse: Bouhssina Cité Boukhzar Sousse</li>
              <li>L'aouina: AV. Mongi Slim-Laouina</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Téléphone</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+21620235829</li>
              <li>+21658982743</li>
              <li>+21655888111</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Réseaux sociaux</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Instagram Abrasif Italia Klindex</li>
              <li>Email abrasif.italia3@gmail.com</li>
              <li>Facebook Abrasif Italia Klindex</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetail;