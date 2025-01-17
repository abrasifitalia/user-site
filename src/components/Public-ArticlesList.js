import React, { useEffect, useState } from "react";
import Navbar from "./includes/navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./includes/footer";
import Loading from "./includes/loading"; 
import Helmet from 'react-helmet';

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
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/article/article`),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories`),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/subcategory/subcategory`),
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/view/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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

  if (loading) return <Loading/>

  return (
    <div>
     
      <Navbar pageTitle="Nos Produits" />
      <div className="bg-light pt-5 pb-2">
        <div className="container">
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {categories.map((category) => (
              <div key={category._id} className="dropdown position-relative">
                <button
                  className="btn btn-danger dropdown-toggle"
                  onClick={() => setSelectedCategory(category._id)}
                  id={`dropdown${category._id}`}
                >
                  {category.name}
                </button>
                {selectedCategory === category._id && (
                  <div
                    className="dropdown-menu show shadow"
                    aria-labelledby={`dropdown${category._id}`}
                    style={{
                      position: "absolute",
                      top: "100%",
                      zIndex: 1000,
                      display: "block",
                    }}
                  >
                    {subCategories.filter(
                      (subCat) => subCat.categoryId?._id === selectedCategory
                    ).length > 0 ? (
                      subCategories
                        .filter(
                          (subCat) =>
                            subCat.categoryId?._id === selectedCategory
                        )
                        .map((subCat) => (
                          <button
                            key={subCat._id}
                            className="dropdown-item"
                            onClick={() => {
                              setSelectedSubCategory(subCat._id);
                              setSelectedCategory(null); // Close dropdown
                            }}
                          >
                            {subCat.name}
                          </button>
                        ))
                    ) : (
                      <div className="dropdown-item text-muted">
                        Pas de sous-catégories disponibles
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <button
              className="btn btn-success"
              onClick={showAllArticles}
            >
              Voir tous les articles
            </button>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center text-2xl font-bold mb-6">
          Liste des Articles
        </h2>
        <div className="row">
          {filteredArticles.length === 0 ? (
            <div className="col-12 text-center">
              <h3 className="text-xl font-semibold text-gray-600">
                Coming Soon!
              </h3>
              <p className="text-gray-500">
                De nouveaux articles seront bientôt disponibles.
              </p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card h-100 shadow-sm relative">
                  
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
                    alt={article.name}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      backgroundColor: "rgba(144, 238, 144, 0.3)",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-success text-lg font-bold rounded-lg  p-2">{article.name}</h5>
                    <p className="card-text text-gray-600">
                      {article.description}
                    </p>
                  </div>
                  {clientId && (
                    <div className="card-footer">
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleClick(article._id)}
                      >
                        Voir Détails
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default ArticlesList;
