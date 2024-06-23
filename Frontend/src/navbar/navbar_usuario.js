
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./navbar_admin.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">PeliFlix</div>
      <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
        <div className="navbar-item" onClick={() => navigateTo("/perfil")}>
          Perfil
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/AlquilerUsuario")}>
          Carrito Compras
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/historial")}>
          Gestion Pedidos
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/perfil")}>
          Proceso Compra
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/")}>
          Cerrar Sesion
        </div>

      </div>
      <div className="navbar-burger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
