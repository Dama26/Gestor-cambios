import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'


function Home() {
  
  const token = localStorage.getItem("token");

  if(token) {
      window.location.href = "/dashboard"
  }
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  }

  const navigateRegister = ()=> {
    navigate("/register")
  }


  return (
    <div className="app-container">
      <div className="card">
        <div className="content">
          <h1 className="title">
            Manejo de <span className="highlight">Proyectos</span>
          </h1>
          <p className="description">
            Bienvenido a tu sitio web donde podrás de manera sencilla desarrollar la
            dirección de tus diferentes proyectos con tus correspondientes equipos de trabajo.
          </p>
          <div className="buttons">
            <button className="login-button" onClick={navigateLogin}>Inicia Sesión</button>
            <button className="register-button" onClick={navigateRegister}>Registro</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

