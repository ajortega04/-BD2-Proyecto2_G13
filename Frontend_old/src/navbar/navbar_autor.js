
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
      <div className="navbar-brand">BookStore</div>
      <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
        <div className="navbar-item" onClick={() => navigateTo("/admin")}>
          Catalogo Autores
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/agregarpelicula")}>
          Gestion Autores
        </div>
        <div className="navbar-item" onClick={() => navigateTo("/eliminarUsuarios")}>
          Catalogo Libros
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
