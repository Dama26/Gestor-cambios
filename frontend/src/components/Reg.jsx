// use client
import React from "react";
import "./registro.css"; // Archivo CSS para estilos


const registro = () => {
  return (
    <div className="registro-container">
      <div className="registro-card">
        <h1 className="registro-title">Inicia tu Registro</h1>
        <form>
          <label htmlFor="email" className="registro-label">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            className="registro-input"
            placeholder="Ingresa tu correo"
          />
          <label htmlFor="" className="registro-label">Nombre</label>
          <input
            type=""
            id="nombre"
            className="registro-input"
            placeholder="Ingresa tu nombre"
          />
          <label htmlFor="" className="registro-label">Apellido</label>
          <input
            type=""
            id="apellido"
            className="registro-input"
            placeholder="Ingresa tu apellido"
          />
          <label htmlFor="password" className="registro-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="registro-input"
            placeholder="Ingresa tu contraseña"
          />
          
          <button type="submit" className="login-button">registarse</button>
        </form>
        <div className="login-links">
          <a href="#Iniciar sesion">Iniciar Sesión</a>
        </div>
      </div>
    </div>
  );
};

export default registro;