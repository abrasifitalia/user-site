import React, { useState } from 'react';
import Loading from './loading';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ArticleBanner = ({ articles, isLoading }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.getElementById('article-scroll');
    const scrollAmount = direction === 'left' ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setScrollPosition(container.scrollLeft + scrollAmount);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nos Produits </h2>
      
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
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {articles.map((article) => (
             <div
             key={article._id}
             className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
           >
             <div className="card h-100 shadow-sm relative">
               
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${article.image}`}
                  alt={article.name}
                  className="card-img-top "
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                   
                  }}
                />
                <h3 className="text-center text-white text-sm font-medium text-gray-900 truncate bg-success p-2 rounded-lg mb-0">
                  {article.name}
                </h3>
              </div>
            </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
