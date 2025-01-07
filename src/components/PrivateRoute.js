import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant PrivateRoute
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');  // Vérifie si l'utilisateur est connecté

  if (!isAuthenticated) {
    // Redirige l'utilisateur non authentifié vers la page de login
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est authentifié, rend l'élément passé en prop
  return element;
};

export default PrivateRoute;
