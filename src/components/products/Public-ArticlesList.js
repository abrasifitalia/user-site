import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../includes/footer";
import Loading from "../includes/loading";
import '../styles/Animation.css';
import '../styles/our_products.css'; 
import { fetchData } from "../functions/product_data";
import NavbarComponent from "../includes/navbar";

const ArticlesList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientName, setClientName] = useState('');
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [clientId, setClientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("clientId");
    setClientId(id);
    const token = localStorage.getItem('token');
    const storedClientName = localStorage.getItem('clientName');
    if (token && storedClientName) {
      setIsLoggedIn(true);
      setClientName(storedClientName);
    }
  }, []);

  useEffect(() => {
    fetchData(setArticles, setCategories, setSubCategories, setLoading);
  }, []);

  const addView = async (articleId) => {
    if (!clientId) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/view/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, articleId }),
      });
      if (response.ok) await response.json();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleClick = (article) => {
    addView(article._id);
    const categoryName = categories.find(cat => cat._id === article.category)?.name || 'undefined';
    const subcategoryName = subCategories.find(subCat => subCat._id === article.subcategory)?.name || 'undefined';
    navigate(`/articles/${categoryName}/${subcategoryName}/${article._id}`);
    window.scrollTo(0, 0);
  };

  const showAllArticles = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? article.subcategory === selectedSubCategory : true;
    const matchesSearch = article.name.toLowerCase().includes(searchTerm) || article.description.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  if (loading) return <Loading />;

  return (
    <div>
      <NavbarComponent 
        pageTitle="Nos Produits"
        description="Découvrez nos produits abrasifs de qualité supérieure, conçus pour répondre à toutes vos besoins en matière de nettoyage et de polissage."
        keywords="produits abrasifs, produits de nettoyage, produits de polissage, produits industriels, produits professionnels, produits abrasifs professionnels, produits de nettoyage professionnels, produits de polissage professionnels, produits abrasifs tunisie, produits de nettoyage tunisie, produits de polissage tunisie, produits industriels tunisie, produits professionnels tunisie, produits abrasifs professionnels tunisie, produits de nettoyage professionnels tunisie, produits de polissage professionnels tunisie, produits abrasifs professionnels tunisie, produits de nettoyage professionnels tunisie, produits de polissage professionnels tunisie, produits abrasifs professionnels tunisie, produits de nettoyage professionnels tunisie, produits de polissage professionnels tunisie"
      />
      
      <div className="filter-banner bg-white shadow-sm py-4">
  <     div className="container">
          {/* Search Bar */}
          <div className="search-banner text-center mb-2">
            <input
              type="text"
              placeholder="hyper grinder , chariot , nettoyage , polissage , etc..."
              className="form-control w-75 mx-auto border-danger border-2 font-bold "
              onChange={handleSearch}
              style={{ height: '50px', fontSize: '1.1rem' }}
            />
          </div>

    {/* Category Buttons */}
    <div className="category-buttons d-flex flex-wrap justify-content-center gap-3">
      {categories.map((category) => (
        <div key={category._id} className="dropdown">
          <button
            className="btn btn-outline-danger dropdown-toggle rounded-pill px-4 fw-bold border-2"
            onClick={() => setSelectedCategory(category._id)}
            id={`dropdown${category._id}`}
          >
            {category.name}
          </button>
          {selectedCategory === category._id && (
            <div
              className="dropdown-menu show shadow mt-2 p-3"
              aria-labelledby={`dropdown${category._id}`}
              style={{ minWidth: '200px', border: 'none' }}
            >
              {subCategories.filter(subCat => subCat.categoryId?._id === selectedCategory).length > 0 ? (
                subCategories
                  .filter(subCat => subCat.categoryId?._id === selectedCategory)
                  .map((subCat) => (
                    <button
                      key={subCat._id}
                      className="dropdown-item fw-bold text-danger rounded mb-2"
                      onClick={() => {
                        setSelectedSubCategory(subCat._id);
                        setSelectedCategory("");
                      }}
                      style={{ transition: 'all 0.3s ease' }}
                    >
                      {subCat.name}
                    </button>
                  ))
              ) : (
                <div className="dropdown-item text-muted text-center">Pas de sous-catégories</div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Show All Articles Button */}
      <button
        className="btn btn-success rounded-pill px-4 fw-bold"
        onClick={showAllArticles}
      >
        Voir tous les articles
      </button>
    </div>
  </div>
</div>

      <div className="container py-4">
        <div className="row">
          {filteredArticles.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h3 className="text-xl font-semibold text-gray-600">
                De nouveaux articles seront bientôt disponibles. <br />
                <Link to="/client/contact" className="text-danger">Contacter-nous</Link> pour plus d'informations
              </h3>
              <img src='/assets/logo-v1.png' alt='logo' className="w-25" />
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div key={article._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" onClick={() => handleClick(article)}>
                <div className="card h-100 shadow-sm relative">
                  <img src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`} alt={article.name} className="card-img-top" />
                  <div className="card-body">
                    <h6 className="card-title">{article.name}</h6>
                    <p className="card-text truncate-lines-3">{article.description}</p>
                  </div>
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