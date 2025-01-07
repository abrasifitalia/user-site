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
    { name: ' CHARIOT DE MENAGE HTK718', image: '/assets/Capture décran 2024-12-02 120803.png' },
    { name: ' CHARIOT DE MENAGE HCK715 c', image: '/assets/Capture décran 2024-12-02 122022.png' },
  ],
  [
    { name: 'Hyper-sanser 430', image: '/assets/HYPER-SANDER-430-1.jpg' },
    { name: 'Lion 430', image: '/assets/LION-430-1.jpg' },
    { name: 'HyperLEvi en Bois', image: '/assets/HyperLEvi-Wooden.jpg' },
  ],
];

const CustomCarousel = () => {
  return (
    <Carousel interval={3000}>
      {productData.map((productSet, index) => (
        <Carousel.Item key={index}>
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {productSet.map((product, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Nouveau conteneur d'image sans ratio fixe */}
                  <div className="flex justify-center items-center" style={{ height: '400px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        height: '350px',
                        width: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <div className="p-6 border-t border-gray-100">
                    <h4 className="text-xl font-semibold text-center text-gray-800">
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
  );
};

export default CustomCarousel;