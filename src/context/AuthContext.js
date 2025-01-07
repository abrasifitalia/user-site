import React, { createContext, useState, useContext, useEffect } from 'react';

// Créez le contexte d'authentification
const AuthContext = createContext();

// Créez un hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  return useContext(AuthContext);
};

// Fournisseur de contexte qui gère l'état de l'authentification
export const AuthProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier la connexion au démarrage de l'application
  useEffect(() => {
    const token = localStorage.getItem('token');
    const clientName = localStorage.getItem('clientName');
    const clientId = localStorage.getItem('clientId');

    if (token && clientName && clientId) {
      setIsLoggedIn(true);
      setClient({ clientName, clientId, token });
    }
  }, []);

  // Fonction pour se connecter
  const login = (clientData) => {
    localStorage.setItem('token', clientData.token);
    localStorage.setItem('clientName', clientData.clientName);
    localStorage.setItem('clientId', clientData.clientId);

    setIsLoggedIn(true);
    setClient(clientData);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clientName');
    localStorage.removeItem('clientId');

    setIsLoggedIn(false);
    setClient(null);
  };

  return (
    <AuthContext.Provider value={{ client, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
