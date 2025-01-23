import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../includes/loading";

const SimilarProducts = ({ categoryId, subCategoryId }) => {
  const { id: currentArticleId } = useParams(); // Dynamically get the current article ID
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  const fetchSimilarProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/article/category/${categoryId}/subcategory/${subCategoryId}`
      );
      if (!response.ok) throw new Error("Failed to fetch similar products");
      const data = await response.json();

      // Exclude the current article dynamically
      setSimilarProducts(data.filter(product => product._id !== currentArticleId));
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSimilarProducts();
  }, [categoryId, subCategoryId, currentArticleId]); // Trigger re-fetch on changes

  const handleProductClick = (productId) => {
    navigate(`/articles/${productId}`);
  };

  if (isLoading)
    return (
     <Loading /> 
    );

  if (fetchError) return <div className="text-danger text-center">Error: {fetchError}</div>;

  return (
    <div className="container my-4 bg-gray-50 rounded-lg p-4">
      <h2 className="text-center text-xl font-medium text-success pb-2">Produits Similaires</h2>
      <div className="row">
        {similarProducts.length > 0 ? (
          similarProducts.map((product) => (
            <div
              key={product._id}
              className="col-md-3 mb-4"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="card h-100 border-2 border-danger">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-sm font-medium text-white truncate bg-success rounded-lg p-2 mb-0">{product.name}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Aucun produit similaire trouvé pour le moment</p>
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
