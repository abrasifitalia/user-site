import React, { useState } from 'react';
import Loading from '../includes/loading';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';


const ArticleBanner = ({ articles, isLoading }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const scroll = (direction) => {
    const container = document.getElementById('article-scroll');
    const scrollAmount = direction === 'left' ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setScrollPosition(container.scrollLeft + scrollAmount);
  };

  const handleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="bg-white py-8 my-4 shadow-lg rounded-lg overflow-hidden mb-12 pt-8"> 
      <h2 className="text-2xl font-bold text-danger text-center  m-4 ">Nos Produits haut de gamme </h2>
      
      {isLoading ? (
        <div className="flex justify-center">
          
          <Loading />
        </div>
      ) : (
        <div className="relative group">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{transform: 'translate(-50%, -50%)'}}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div 
            id="article-scroll"
            className="relative overflow-x-auto"
          >
            <div className="flex gap-4  mx-4">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div className="card h-100 shadow-sm relative">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
                      alt={article.name}
                      className="card-img-top bg-gray-100"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      onClick={() => handleClick(article._id)}
                    />
                    <h3 className="text-center text-white text-sm font-medium text-gray-900 truncate bg-success p-2  mb-0">
                      {article.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => scroll('right')}
            className="pt-4 absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{transform: 'translate(50%, -50%)'}}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleBanner;
