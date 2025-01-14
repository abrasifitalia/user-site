import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h5 className="ms-3">Chargement en cours...</h5>
    </div>
  );
};

export default Loading;