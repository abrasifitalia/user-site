import React from 'react';

const Partner = () => {
  return (
    <div className="bg-white py-12 shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Nos Partenaires</h3>
          <p className="text-gray-500 mb-6">Découvrez nos marques de qualité qui nous accompagnent.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {['/assets/hg.png', '/assets/mixer.png', '/assets/uctem.png', '/assets/Capture d\'écran 2024-12-12 155506.png'].map((src, index) => (
            <div key={index} className="flex justify-center transition-transform duration-300 transform hover:scale-110">
              <img
                src={src}
                alt={`Brand ${index + 1}`}
                className="w-full h-32 object-contain rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partner;