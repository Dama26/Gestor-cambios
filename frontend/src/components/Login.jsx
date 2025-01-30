import React, { useState } from "react"
import { Link } from 'react-router-dom';
import axios from "axios"
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const token = localStorage.getItem("token");

  if(token) {
      window.location.href = "/dashboard"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("Intentando login con:", { email }) // No logear la contraseña

      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
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
        if (rememberMe) {
          localStorage.setItem("userEmail", email)
        }
        window.location.href = "/dashboard"
        localStorage.setItem("name", response.data.name)
      }
    } catch (err) {
      console.error("Error en login:", err.response?.data || err.message)

      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.msg || "Credenciales inválidas")
      } else {
        setError("Error de conexión. Por favor, intenta de nuevo.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Inicio de Sesión</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className="login-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-remember">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Recordarme</label>
          </div>
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="login-links">

          <a href="#forgot-password">¿Olvidaste tu contraseña?</a>
          <div></div>
          
          <Link to={`/register`}>Crear Cuenta</Link>
        </div>
      </div>
    </div>
  )
}

export default Login

