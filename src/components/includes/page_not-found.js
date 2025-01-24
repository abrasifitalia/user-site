import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const PageNotFound = () => {
  return (
    <div>
      <Navbar pageTitle={"Page non trouvée"} />
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
