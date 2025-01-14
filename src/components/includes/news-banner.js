import React from 'react';
import '../styles/NewsBanner.css'; // Import the custom CSS file

const NewsBanner = () => {
  return (
    <div className="alert alert-danger text-center mb-0 shadow overflow-hidden position-relative">
      <div className="marquee">
        <span className="marquee-content">
          <strong className="me-2">🚨 Mise à jour:</strong> 
          Nous mettons actuellement à jour le site web! Merci de votre compréhension.
        </span>
        <span className="marquee-content">
          <strong className="me-2">🚨 Mise à jour:</strong> 
          Nous mettons actuellement à jour le site web! Merci de votre compréhension.
        </span>
      </div>
    </div>
  );
};

export default NewsBanner;
