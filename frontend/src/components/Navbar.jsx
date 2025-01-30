import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const closeSession = (e) => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar-logo">
      </div>
      <div className="navbar-links">
        <a href="#profile">Profile</a>
        <a href="#" onClick={closeSession}>Cerrar Sesión</a>
      </div>
    </header>
  );
};

export default Navbar;
