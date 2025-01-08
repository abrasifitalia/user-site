import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [clientId, setClientId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("clientId");
    setClientId(id);
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes, subCategoriesRes] = await Promise.all([
          fetch(`${process.env.API_BASE_URL}/api/article/article`),
          fetch(`${process.env.API_BASE_URL}/api/category/categories`),
          fetch(`${process.env.API_BASE_URL}/api/subcategory/subcategory`),
        ]);

        setArticles(await articlesRes.json());
        setCategories(await categoriesRes.json());
        setSubCategories(await subCategoriesRes.json());
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addView = async (articleId) => {
    if (!clientId) {
      console.error("Client non identifié");
      return;
    }
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/api/view/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: clientId,
          articleId: articleId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Vue ajoutée:', data);
      } else {
        console.error('Erreur lors de l\'ajout de la vue:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleClick = (articleId) => {
    addView(articleId);
    navigate(`/articles/${articleId}`);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? article.subcategory === selectedSubCategory : true;
    return matchesCategory && matchesSubCategory;
  });

  const showAllArticles = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
  };

  if (loading) return <p>Chargement des données...</p>;

  return (
    <div>
      <Navbar />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <div className="navbar-collapse collapse justify-content-center" id="navbarSupportedContent">
      <ul className="navbar-nav">
        {categories.map((category) => (
          <li key={category._id} className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setSelectedCategory(category._id)}
              id={`dropdown${category._id}`}
            >
              {category.name}
            </button>
            {selectedCategory === category._id && (
              <div className="dropdown-menu show" aria-labelledby={`dropdown${category._id}`}>
                {subCategories.filter(subCat => subCat.categoryId?._id === selectedCategory).map(subCat => (
                  <button
                    key={subCat._id}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedSubCategory(subCat._id);
                      setSelectedCategory(null); // Fermer la liste déroulante
                    }}
                  >
                    {subCat.name}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={showAllArticles}
          >
            Voir tous les articles
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>


      <div className="min-h-screen flex">
      <aside className="w-64 bg-white shadow-lg p-4">
  <h3 className="text-lg font-semibold mb-4">Catégories</h3>
  {categories.map((category) => (
    <div key={category._id} className="mb-2">
      <button
        className={`w-full text-left p-2 hover:bg-gray-50 ${selectedCategory === category._id ? 'bg-blue-200' : 'bg-gray-100'} rounded`}
        onClick={() => setSelectedCategory(category._id)}
      >
        {category.name}
      </button>
      {selectedCategory === category._id && (
        <div className="ml-4 mt-2">
          {subCategories.filter(subCat => subCat.categoryId?._id === selectedCategory).map(subCat => (
            <button
              key={subCat._id}
              className={`w-full text-left p-2 text-sm hover:bg-gray-50 ${selectedSubCategory === subCat._id ? 'bg-green-200' : 'bg-gray-50'} rounded`}
              onClick={() => setSelectedSubCategory(subCat._id)}
            >
              {subCat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  ))}
  <button
    className="w-full text-left p-2 mt-4 text-sm bg-yellow-100 hover:bg-yellow-200 rounded"
    onClick={showAllArticles}
  >
    Voir tous les articles
  </button>
</aside>

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6">Liste des Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredArticles.length === 0 ? (
              <p>Aucun article trouvé</p>
            ) : (
              filteredArticles.map((article) => (
                <div key={article._id} className="card h-100 shadow-md">
                  <img
                    src={`${process.env.API_BASE_URL}${article.image}`}
                    alt={article.name}
                    className="card-img-top"
                    style={{ width: '100%', height: '200px', objectFit: 'contain', backgroundColor: '#f0f0f0' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.name}</h5>
                    <p className="card-text text-gray-600">{article.description}</p>
                  </div>
                  {clientId && (
                    <div className="card-footer">
                      <button
                        className="btn btn-primary w-full"
                        onClick={() => handleClick(article._id)}
                      >
                        Voir
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
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
              <li>Instagram: Abrasif Italia Klindex</li>
              <li>Email: abrasif.italia3@gmail.com</li>
              <li>Facebook: Abrasif Italia Klindex</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticlesList;
