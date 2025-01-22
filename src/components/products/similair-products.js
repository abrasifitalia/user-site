import React, { useEffect, useState } from "react";

const SimilarProducts = ({ categoryId, subCategoryId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fetchSimilarProductsBySubcategory = async (subCategory) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/article/subcategory/${subCategory}`);
      if (!response.ok) {
        throw new Error("Failed to fetch similar products by subcategory");
      }
      return await response.json();
    } catch (err) {
      setFetchError(err.message);
      return [];
    }
  };

  const fetchSimilarProductsByCategory = async (category) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/article/category/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch similar products by category");
      }
      return await response.json();
    } catch (err) {
      setFetchError(err.message);
      return [];
    }
  };

  useEffect(() => {
    const getSimilarProducts = async () => {
      // First, try to fetch based on subcategory
      
      let products = await fetchSimilarProductsBySubcategory(subCategoryId);
      
      // If no products found, try fetching based on main category
      if (products.length === 0) {
        products = await fetchSimilarProductsByCategory(categoryId); // Fetch based on category
      }

      setSimilarProducts(products);
      setIsLoading(false);
    };

    getSimilarProducts();
  }, [categoryId, subCategoryId]);

  if (isLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;

  return (
    <div className="similar-products">
      <h2>Similar Products</h2>
      <div className="product-list">
        {similarProducts.map(product => (
          <div key={product._id} className="product-item"> {/* Assuming product has _id */}
            <img 
              src={`${process.env.REACT_APP_API_BASE_URL}${product.image}`} 
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;