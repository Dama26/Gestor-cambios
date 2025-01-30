const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

// Register controller
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    // Check if user exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "User already exists" })
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // Save user
    await user.save()
    console.log("Usuario registrado:", { email, name })

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token, name })
    })
  } catch (err) {
    console.error("Error en registro:", err.message)
    res.status(500).send("Server error")
  }
}

// Login controller
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      console.log("Usuario no encontrado:", email)
      return res.status(400).json({ msg: "Credenciales inválidas" })
    }

    // Verify password
    console.log("Comparando contraseñas para:", email)
    const isMatch = await bcrypt.compare(password, user.password)
    console.log("Resultado de comparación de contraseñas:", isMatch)

    if (!isMatch) {
      console.log("Contraseña incorrecta para:", email)
      return res.status(400).json({ msg: "Credenciales inválidas" })
    }

    console.log("Login exitoso para:", email)

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token, name: user.name })
    })
  } catch (err) {
    console.error("Error en login:", err.message)
    res.status(500).send("Error del servidor")
  }
}

