import React from "react";
import { Link } from "react-router-dom";
import Footer from "../includes/footer";
import NavbarComponent from "../includes/navbar";
import SEO from "./seo";

const PageNotFound = () => {
  return (
    <>
    <SEO
      title="404 - Page Non Trouvée"
      description="Désolé, la page que vous recherchez n'existe pas. Veuillez vérifier l'URL ou retourner à la page d'accueil."
      image="https://abrasifitalia.com/assets/logo-v1.png"
      keywords="404, page non trouvée, erreur, Abrasivi Italia, produits abrasifs, équipement de polissage"
    />
    <div>
      <NavbarComponent />
      <div className="col-12 text-center py-5">
        <h3 className="text-xl font-semibold text-gray-600">
          Page non trouvée  <br/> 
          <Link to="/contact-us" className="text-danger">Contacter-nous</Link> si tu rencontre un problème
        </h3>
        <img src='/assets/logo-v1.png' alt='logo' className="w-25" />
      </div>
      <Footer />
    </div>
    </>
  );
};

export default PageNotFound;
