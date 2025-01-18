import React from "react";
import '../styles/Partner.css';

const Partner = () => {
  return (
    <div className="bg-white py-8 my-4 shadow-lg rounded-lg overflow-hidden mb-12 pt-8"> {/* Increased padding top from pt-4 to pt-8 */}
        <div className="text-center ">
          <h3 className="text-2xl font-bold text-danger text-center  m-4 ">Nos Partenaires</h3>
        </div>

        {/* Scrolling Container */}
        <div className="relative overflow-x-auto">
          <div className="flex space-x-6 sm:space-x-8">
            {[
              "/assets/hg.png",
              "/assets/mixer.png",
              "/assets/uctem.png",
              "/assets/eurolux.png",
              "/assets/ital-abrasivi.png",
           
            ].map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 flex justify-center items-center transition-transform duration-300 transform hover:scale-110"
              >
                <img
                  src={src}
                  alt={`Brand ${index + 1}`}
                  className="w-full h-full object-contain "
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
