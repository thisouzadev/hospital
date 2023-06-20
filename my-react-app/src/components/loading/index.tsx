import React from "react";

const Loading: React.FC = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "200px" }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
