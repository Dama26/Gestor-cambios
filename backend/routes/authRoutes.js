const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const { register, login, enableMFA } = require("../controllers/auth")

// Ruta para registro
router.post(
  "/register",
  [
    check("name", "El nombre es requerido").not().isEmpty(),
    check("email", "Por favor incluye un email válido").isEmail(),
    check("password", "Por favor ingresa una contraseña con 6 o más caracteres").isLength({ min: 6 }),
  ],
  register,
)

// Ruta para login
router.post(
  "/login",
  [
    check("email", "Por favor incluye un email válido").isEmail(),
    check("password", "La contraseña es requerida").exists(),
  ],
  login,
)

// Ruta para habilitar MFA


module.exports = router

