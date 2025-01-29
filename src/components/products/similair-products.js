import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../utils/loading";
import { fetchSimilarProducts } from "../functions/product_data";
import '../styles/similar_products.css';
import { softScroll } from "../utils/soft_scroll";

const SimilarProducts = ({ categoryId, subCategoryId }) => {
  const { id: currentArticleId } = useParams();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchSimilarProducts(categoryId, subCategoryId, currentArticleId, setSimilarProducts, setIsLoading, setFetchError, setCategoryName, setSubcategoryName);
  }, [categoryId, subCategoryId, currentArticleId]);

  const handleProductClick = (productId, categoryName, subcategoryName) => {
    navigate(`/articles/${categoryName}/${subcategoryName}/${productId}`);
    softScroll();
  };

  if (isLoading) return <Loading />;
  if (fetchError) return <div className="error-message">Error: {fetchError}</div>;

  return (
    <div className="similar-products-container">
      <h2 className="section-title">Produits Similaires</h2>
      <div className="products-grid">
        {similarProducts.length > 0 ? (
          similarProducts.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleProductClick(product._id, categoryName, subcategoryName)}
            >
              <div className="product-image-container">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-message">Aucun produit similaire trouvé pour le moment</p>
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;