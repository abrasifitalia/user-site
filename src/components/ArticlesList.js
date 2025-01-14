import React, { useEffect, useState } from "react";
import Navbar from "./includes/navbar";
import { useNavigate } from "react-router-dom";
import Loading from "./includes/loading"; 

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const navigate = useNavigate();

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

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? article.subcategory === selectedSubCategory : true;
    return matchesCategory && matchesSubCategory;
  });

  const showAllArticles = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
  };

  if (loading) return <Loading/>;


  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex">
        <aside className="w-64 bg-white shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Catégories</h3>
          {categories.map((category) => (
            <div key={category._id}>
              <button
                className="w-full text-left p-2 hover:bg-gray-50"
                onClick={() => setSelectedCategory(category._id)}
              >
                {category.name}
              </button>
              {selectedCategory === category._id && (
                <div className="ml-4 mt-2">
                  {subCategories
                    .filter((subCat) => subCat.categoryId?._id === selectedCategory)
                    .map((subCat) => (
                      <button
                        key={subCat._id}
                        className="w-full text-left p-2 text-sm hover:bg-gray-50"
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
            className="w-full text-left p-2 mt-4 text-sm hover:bg-gray-50"
            onClick={showAllArticles}
          >
            Voir tous les articles
          </button>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6">Liste des Articles</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4"> {/* Bootstrap grid */} 
            {filteredArticles.length === 0 ? (
              <p>Aucun article trouvé</p>
            ) : (
              filteredArticles.map((article) => (
                <div key={article._id} className="col">
  <div className="card h-100 shadow-md">
    <img
        src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
      alt={article.name}
      className="card-img-top"
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'contain', // Garantit que l'image est complètement visible
        backgroundColor: '#f0f0f0', // Ajoute un fond si l'image est plus petite
      }}
    />
    <div className="card-body">
      <h5 className="card-title">{article.name}</h5>
      <p className="card-text text-gray-600">{article.description}</p>
      {article.price && <p className="text-lg font-semibold">Prix : {article.price} DNT</p>}
    </div>
    <div className="card-footer">
     
    </div>
  </div>
</div>

              
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArticlesList;
