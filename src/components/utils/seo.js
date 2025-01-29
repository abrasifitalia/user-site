import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title, 
  description, 
  image, 
  keywords, 
  schemaType = 'WebPage',
  product 
}) => {
  const { pathname } = useLocation();
  const baseUrl =  'https://abrasifitalia.com';
  const fullTitle = `${title ? `${title} | Abrasif Italia` : 'Abrasif Italia'}`;
  const fullDescription = description || "Découvrez Abrasivi Italia, leader des produits abrasifs et équipements de polissage en Tunisie.";
  const fullImage = image ? `${image}` : `${baseUrl}/assets/logo-v1.png`;
  const canonicalUrl = `${baseUrl}${pathname}`;


  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords || "abrasifs tunisie, polissage tunisie, Klindex tunisie"} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.string,
  schemaType: PropTypes.string,
  product: PropTypes.object
};

export default SEO;