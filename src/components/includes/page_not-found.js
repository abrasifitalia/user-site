import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const PageNotFound = () => {
  return (
    <div>
      <Navbar pageTitle={"Page non trouvée"} description="La page que vous cherchez n'existe pas. Vous pouvez contacter notre équipe pour obtenir de l'aide." />
      <div className="col-12 text-center py-5">
        <h3 className="text-xl font-semibold text-gray-600">
          Page non trouvée  <br/> 
          <Link to="/client/contact" className="text-danger">Contacter-nous</Link> si tu rencontre un problème
        </h3>
        <img src='/assets/logo-v1.png' alt='logo' className="w-25" />
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
