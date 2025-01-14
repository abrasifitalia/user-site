import React from 'react';
import { Carousel } from 'react-bootstrap';

const productData = [
  [
    { name: 'Hyperlevi 430', image: '/assets/2.png' },
    { name: 'i – 4 BOIS', image: '/assets/I4wood-1-1.jpg' },
    { name: 'Hyperlevi 450', image: '/assets/HYPERLEVI-450-1.jpg' },
  ],
  [
    { name: 'CHARIOT HÔTELLERIE KA441FB', image: '/assets/8.png' },
    { name: 'CHARIOT DE MENAGE HTK718', image: '/assets/Capture décran 2024-12-02 120803.png' },
    { name: 'CHARIOT DE MENAGE HCK715 c', image: '/assets/Capture décran 2024-12-02 122022.png' },
  ],
  [
    { name: 'Hyper-sanser 430', image: '/assets/HYPER-SANDER-430-1.jpg' },
    { name: 'Lion 430', image: '/assets/LION-430-1.jpg' },
    { name: 'HyperLEvi en Bois', image: '/assets/HyperLEvi-Wooden.jpg' },
  ],
];

const BestSelling = () => {
  return (
    <div className="bg-white py-16 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Best Selling Products</h2>
      <Carousel interval={3000} className="carousel-fade">
        {productData.map((productSet, index) => (
          <Carousel.Item key={index}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {productSet.map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <div className="flex justify-center items-center" style={{ height: '300px', transition: 'transform 0.5s ease-in-out' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="p-4 border-t border-gray-200 transition-transform transform hover:-translate-y-2">
                      <h4 className="text-lg font-semibold text-center text-gray-800 bg-white p-2 rounded shadow-md">
                        {product.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BestSelling;