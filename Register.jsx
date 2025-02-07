import React, { useState } from "react"
import { Link } from 'react-router-dom';

import axios from "axios"
import './Register.css'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, steName] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setError("")
      setIsLoading(true)
  
      try {
        console.log("Intentando registrar con:", { email }) // No logear la contraseña
  
        const response = await axios.post(
          "http://localhost:3001/api/auth/register",
          {
            email: email.trim(),
            password: password.trim(),
            name: name.trim()
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
  
        console.log("Respuesta del servidor:", response.data.token ? "Token recibido" : "Sin token")
  
        if (response.data.token) {
          localStorage.setItem("token", response.data.token)
          window.location.href = "/dashboard?name=" + response.data.name
        }
      } catch (err) {
        console.error("Error en registro:", err.response?.data || err.message)
  
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.msg || "Error al procesar")
        } else {
          setError("Error de conexión. Por favor, intenta de nuevo.")
        }
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <div className="registro-container">
        <div className="registro-card">
          <h1 className="registro-title">Inicia tu Registro</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="registro-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="registro-input"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="" className="registro-label">Nombre</label>
            <input
              type=""
              id="name"
              className="registro-input"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => steName(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className="login-button">registarse</button>
          </form>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <div className="login-links">
            <Link to={`/login`}>Iniciar Sesión</Link>
          </div>
        </div>
      </div>

    );}

export default Register