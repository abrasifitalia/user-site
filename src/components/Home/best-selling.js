import React from 'react';
import { useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel'; // Import Carousel from react-multi-carousel
import 'react-multi-carousel/lib/styles.css'; // Import the default styles for the carousel
import Loading from '../utils/loading';

const ArticleBanner = ({ articles, isLoading, categories, subCategories }) => {
  const navigate = useNavigate();

  const handleClick = (article) => {
    const categoryName = categories.find(cat => cat._id === article.category)?.name || 'undefined';
    const subcategoryName = subCategories.find(subCat => subCat._id === article.subcategory)?.name || 'undefined';
    navigate(`/articles/${categoryName}/${subcategoryName}/${article._id}`);
  };

  // Shuffle articles to display them in a random order
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledArticles = shuffleArray([...articles]); // Create a shuffled copy of the articles

  // Define responsive breakpoints for the carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4, // Show 4 products on desktop
      slidesToSlide: 1, // Scroll one item at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2, // Show 2 products on tablets
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Show 1 product on mobile
      slidesToSlide: 1,
    },
  };

  return (
    <div className="bg-white py-8 my-4 shadow-lg rounded-lg overflow-hidden mb-12 pt-8">
      <h2 className="text-2xl font-bold text-danger text-center m-4">Nos Produits haut de gamme</h2>

      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          ssr={true} // Enable server-side rendering
          infinite={true} // Loop carousel
          autoPlay={true} // Enable auto-scroll
          autoPlaySpeed={3000} // Set auto-scroll speed
          keyBoardControl={true} // Enable keyboard navigation
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]} // Remove arrows for smaller devices
        >
          {shuffledArticles.map((article) => (
            <div key={article._id} className="p-2 ">
              <div className="card h-100 shadow-sm relative border border-white">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
                  alt={article.name}
                  className="card-img-top bg-white"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  onClick={() => handleClick(article)}
                />
                <h3 className="text-center text-white text-sm font-medium text-gray-900 truncate bg-success p-2 mb-0">
                  {article.name}
                </h3>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ArticleBanner;
