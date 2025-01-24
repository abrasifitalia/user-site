import axios from 'axios';


//fetch article by id
export const fetchArticleById = async (id, setArticle, setLoading, setError) => {
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
//fetch all articles, categories and subcategories
export const fetchData = async (setArticles, setCategories, setSubCategories, setLoading) => {
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

  //Fetch similar products by category and subcategory & set category name and subcategory name to use in the url
export const fetchSimilarProducts = async (categoryId, subCategoryId, currentArticleId, setSimilarProducts, setIsLoading, setFetchError, setCategoryName, setSubcategoryName) => {
    try {
        const [categoryResponse, subcategoryResponse] = await Promise.all([
            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories`),
            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/subcategory/subcategory`),
          ]);
          const categoryData = await categoryResponse.json();
          const subcategoryData = await subcategoryResponse.json();
          setCategoryName(categoryData.find(category => category._id === categoryId)?.name);
          setSubcategoryName(subcategoryData.find(subcategory => subcategory._id === subCategoryId)?.name);
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
