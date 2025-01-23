import React, { useEffect, useState } from "react";
import Navbar from "../includes/navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../includes/footer";
import Loading from "../includes/loading";
import { Link } from "react-router-dom";
import '../styles/Animation.css'

const ArticlesList = () => {
  // State variables
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

  // Effect to check client login status and retrieve client ID
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

  // Effect to fetch articles, categories, and subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes, subCategoriesRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/article/article`),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories`),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/subcategory/subcategory`),
        ]);
    
        const articlesData = await articlesRes.json();
        const categoriesData = await categoriesRes.json();
        const subCategoriesData = await subCategoriesRes.json();
    
        console.log("Fetched Articles:", articlesData);
        console.log("Fetched Categories:", categoriesData);
        console.log("Fetched SubCategories:", subCategoriesData);
    
        setArticles(articlesData);
        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Function to add a view for an article
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

  // Function to handle article click
  const handleClick = (articleId) => {
    addView(articleId);
    navigate(`/articles/${articleId}`);
  };

  // Function to reset selected categories
  const showAllArticles = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
  };

  // Function to handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter articles based on selected category, subcategory, and search term
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? article.subcategory === selectedSubCategory : true;
    const matchesSearch = article.name.toLowerCase().includes(searchTerm) || article.description.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSubCategory && matchesSearch;
  });
  
  // Show loading indicator while data is being fetched
  if (loading) return <Loading />

  return (
    <div>
      <Navbar pageTitle="Nos Produits" />
      <div className="bg-light pt-2 pb-2">
        <div className="container ">
          <div className="search-banner text-center py-4">
            <input
              type="text"
              placeholder="Rechercher des articles..."
              className="form-control w-75 mx-auto text-danger font-bold"
              onChange={handleSearch}
            />
          </div>
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
                    className="dropdown-menu show shadow my-2"
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
                            className="dropdown-item font-bold text-danger rounded rounded-lg active:bg-danger active:text-white"
                            onClick={() => {
                              setSelectedSubCategory(subCat._id);
                              setSelectedCategory(""); // Close dropdown
                            }}
                          >
                            {subCat.name}
                          </button>
                        ))
                    ) : (
                      <div className="dropdown-item text-muted text-center">
                        Pas de sous-catégories 
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

      <div className="container py-4">
        <div className="row">
          {filteredArticles.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h3 className="text-xl font-semibold text-gray-600">
                De nouveaux articles seront bientôt disponibles.  <br/> 
                <Link to="/client/contact" className="text-danger">Contacter-nous</Link> pour plus d'informations
              </h3>
              <img src='/assets/logo-v1.png' alt='logo' className="w-25" />
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                onClick={() => handleClick(article._id)}
              >
                <div className="card h-100 shadow-sm relative" style={{ position: "relative" }}>
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
                    alt={article.name}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  {/* Disponible Tag */}
                  <span
                    className="disponible-tag opacity-82 pulse-animation "
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#dc3545", // Red background
                      color: "#fff", // White text
                      padding: "5px 6px",
                      borderRadius: "20px",
                      fontSize: "0.6rem",
                      
                      zIndex: "1", // Ensures it appears on top of the image
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow
                    }}
                  >
                    Disponible
                  </span>

                  <div className="card-body">
                    <h6 className="card-title text-xl text-white bg-success text-lg rounded-lg p-2">{article.name}</h6>
                    <p className="card-text text-gray-600  text-sm truncate-lines-3">
                       {article.description}
                    </p>
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