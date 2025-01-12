import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contactez-nous</h4>
          <p className="text-gray-400">
            Nous sommes là pour répondre à toutes vos questions et vous aider
            dans vos projets.
          </p>
        </div>

        {/* Location Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Nos locaux</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Ariana: Croisement La Soukra</li>
            <li>Sousse: Bouhssina, Cité Boukhzar</li>
            <li>L’Aouina: AV. Mongi Slim</li>
          </ul>
        </div>

        {/* Phone Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Téléphone</h4>
          <ul className="space-y-2 text-gray-400">
            <li>+216 2023 5829</li>
            <li>+216 5898 2743</li>
            <li>+216 5588 8111</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Réseaux sociaux</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Instagram: Abrasif Italia Klindex</li>
            <li>Email: abrasif.italia3@gmail.com</li>
            <li>Facebook: Abrasif Italia Klindex</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        © 2025 Abrasif Italia. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
