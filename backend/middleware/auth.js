const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  // Obtener el token del header
  const token = req.header("Authorization")?.replace("Bearer ", "")

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" })
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: "Token no válido" })
  }
}

