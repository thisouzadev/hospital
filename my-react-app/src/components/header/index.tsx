import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { setLocalStorage } from "../../utils/functions/setLocalStorage";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout, como remover token ou limpar dados de autenticação
    // setLocalStorage("token", null);
    // setLocalStorage("user", null);
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-between">
          <Link to="/admin/manage" className="navbar-brand align-self-center">
            Meu Site
          </Link>
          <button className="btn btn-link" onClick={handleLogout}>
            <FiLogOut size={30} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
