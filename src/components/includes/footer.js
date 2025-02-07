import React from 'react';
import { CiFacebook  , CiInstagram , CiMail} from "react-icons/ci";
import { FaWhatsapp } from 'react-icons/fa6';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contactez-nous</h4>
          <p className="text-gray-400 font-bold">
         Nous sommes là pour répondre à toutes vos questions et vous aider . 
         vous etes le bienvenu aussi bien en ligne que dans nos locaux.
          </p>
        </div>

        {/* Location Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">Nos locaux</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="font-bold">Ariana: Croisement La Soukra</li>
            <li className="font-bold">Sousse: Bouhssina, Cité Boukhzar</li>
            <li className="font-bold">L’Aouina: AV. Mongi Slim</li>
          </ul>
        </div>

        {/* Phone Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Téléphone</h4>
          <ul className="space-y-2 text-gray-400">
            <li> <FaWhatsapp className="text-success text-2xl "/> <a href="https://wa.me/21620235829" className="text-gray-400 link-underline link-underline-opacity-0"><span className=" text-gray-400  "> +216 2023 5829</span></a></li>
            <li> <FaWhatsapp className="text-success text-2xl "/> <a href="https://wa.me/21658982743" className="text-gray-400 link-underline link-underline-opacity-0"> <span className=" text-gray-400"> +216 5898 2743</span></a></li>
            <li> <FaWhatsapp className="text-success text-2xl "/> <a href="https://wa.me/21655888111" className="text-gray-400 link-underline link-underline-opacity-0"> <span className=" text-gray-400"> +216 5588 8111</span></a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Réseaux sociaux</h4>
          <ul className="space-y-2 text-gray-400">
            <li><CiInstagram className="text-success text-2xl "/> <a href="https://www.instagram.com/abrasif_italia_hg/" className="text-gray-400 link-underline link-underline-opacity-0"> <span className="font-bold text-gray-400">Abrasif Italia HG</span></a></li>
            <li><CiFacebook className="text-success text-2xl font-bold"/> <a href="https://www.facebook.com/profile.php?id=100057219229918" className="text-gray-400 link-underline link-underline-opacity-0"> <span className="font-bold text-gray-400"> Abrasif Italia HG</span></a></li>
            <li><CiMail className="text-success text-2xl font-bold"/> <a href="mailto:soukra@abrasifitalia.com" className="text-gray-400 link-underline link-underline-opacity-0"> <span className="font-bold text-gray-400">soukra@abrasifitalia.com</span></a></li>
            <li><CiMail className="text-success text-2xl font-bold"/> <a href="mailto:sousse@abrasifitalia.com" className="text-gray-400 link-underline link-underline-opacity-0"> <span className="font-bold text-gray-400">sousse@abrasifitalia.com</span></a></li>
            <li><CiMail className="text-success text-2xl font-bold"/> <a href="mailto:abrasif.italia3@gmail.com" className="text-gray-400 link-underline link-underline-opacity-0"> <span className="font-bold text-gray-400"> directeur@abrasifitalia.com</span></a></li>
            
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 text-center text-success text-sm">
        © <span className="font-bold text-danger">{new Date().getFullYear()}</span> Abrasif Italia. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
