const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Login Café" })
})

// Rutas de autenticación
app.use("/api/auth", authRoutes)

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" })
})

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/login_cafe")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err))

// api port
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

