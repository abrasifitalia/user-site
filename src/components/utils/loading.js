import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden text-danger">Loading...</span>
      </div>
      <h5 className="ms-3 text-danger">Chargement en cours...</h5>
    </div>
  );
};

export default Loading;