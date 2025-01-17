import React from "react";

const CompanyLocation = () => {
  return (
    <div className="bg-white items-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-danger mb-8 text-center p-30">
         Nos Emplacements
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* First Location */}
        <div className="bg-white rounded-lg shadow-md p-6 items-center">
          <h4 className="text-xl font-semibold text-green-600 mb-4">Ariana</h4>
          <p className="text-gray-700 mb-2">
            <strong>Adresse:</strong> Croisement La Soukra
          </p>
          {[
            { label: "Téléphone", number: "+216 55 888 111" },
            { label: "Téléphone 2", number: "+216 20 235 829" },
            { label: "Téléphone 3", number: "+216 94 615 025" },
            { label: "Téléphone 4", number: "+216 22 107 207" },
          ].map((phone, index) => (
            <p className="text-white mb-4 bg-success p-2 rounded-lg" key={index}>
              <strong>{phone.label} :</strong>{" "}
              <a
                href={`tel:${phone.number.replace(/\s/g, '')}`}
                className="text-white hover:text-green-800 transition-colors"
              >
                {phone.number}
              </a>
            </p>
          ))}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d822826.3192766692!2d9.7467303!3d36.3325432!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cb32b001ae29%3A0x8599646157513aca!2sAbrasif%20Italia%20Klindex!5e0!3m2!1sfr!2stn!4v1737038397640!5m2!1sfr!2stn"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>

        {/* Second Location */}
        <div className="bg-white  p-6">
          <h4 className="text-xl font-semibold text-green-600 mb-4">Sousse</h4>
          <p className="text-gray-700 mb-2">
            <strong>Adresse:</strong> Bouhssina, Cité Boukhzar
          </p>
          {[
            { label: "Téléphone 1", number: "+216 58 982 743" },
            { label: "Téléphone 2", number: "+216 55 334 131" },
          ].map((phone, index) => (
            <p className="text-white mb-4 bg-success p-2 rounded-lg" key={index}>
              <strong>{phone.label} :</strong>{" "}
              <a
                href={`tel:${phone.number.replace(/\s/g, '')}`}
                className="text-white hover:text-green-800 transition-colors"
              >
                {phone.number}
              </a>
            </p>
          ))}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1161607.3130379696!2d9.407760752335607!3d36.46922189368688!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd8b81f9527ed5%3A0x3eeac41c8017c1de!2sAbrasif%20italia!5e0!3m2!1sfr!2stn!4v1737038425440!5m2!1sfr!2stn"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CompanyLocation;
