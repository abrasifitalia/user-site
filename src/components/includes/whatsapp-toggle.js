import React from 'react';
import '../styles/Animation.css'; // Importing CSS for animations

const WhatsappToggle = () => {
  const whatsappNumber = "21620235829"; // Replace with your WhatsApp number

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 pulse-animation" 
      style={{
        width: '80px', // Adjust size if needed
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        onClick={handleClick}
        aria-label="Contact us on WhatsApp"
        style={{
          background: 'none', // No background
          border: 'none', // No border
          padding: 0, // Remove padding
          cursor: 'pointer', // Pointer for better UX
        }}
      >
        <img 
          src="/assets/whatsapp-icon.png" 
          alt="WhatsApp" 
          style={{
            width: '100%', // Adjust the size dynamically
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </button>
    </div>
  );
};

export default WhatsappToggle;
