import React, { useState } from "react"
import axios from "axios"

const EnableMFA = () => {
  const [qrCode, setQrCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleEnableMFA = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(
        "http://localhost:3001/api/auth/enable-mfa",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.data.qrCode) {
        setQrCode(response.data.qrCode)
        setSuccess(true)
      }
    } catch (err) {
      setError("Error al habilitar MFA. Por favor intenta de nuevo.")
      console.error("Error:", err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Configurar Autenticación de Dos Factores</h2>

        {!success ? (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Al habilitar la autenticación de dos factores, necesitarás ingresar un código adicional cada vez que
              inicies sesión.
            </p>
            <button
              onClick={handleEnableMFA}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Habilitar Autenticación de Dos Factores
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-green-600 font-semibold mb-4">¡MFA habilitado exitosamente!</p>
            <div className="flex justify-center mb-4">
              <img src={qrCode || "/placeholder.svg"} alt="QR Code para MFA" className="border p-2" />
            </div>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Descarga Google Authenticator en tu teléfono</li>
              <li>Abre la aplicación y escanea el código QR</li>
              <li>
                La próxima vez que inicies sesión, necesitarás ingresar el código de 6 dígitos que aparece en la app
              </li>
            </ol>
          </div>
        )}

        {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      </div>
    </div>
  )
}

export default EnableMFA

