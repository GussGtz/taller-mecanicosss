import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar a la página

const VerificarCorreo  = () => {
  const [destinatario, setDestinatario] = useState('');
  const [codigoVerificacion, setCodigoVerificacion] = useState('');
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Instancia de useNavigate

  function generarCodigoVerificacion() {
    // Generar un código de verificación de 4 dígitos aleatorio y lo convierte a cadena
    return String(Math.floor(1000 + Math.random() * 9000));
  }

  const handleEnvioCorreo = async () => {
    try {
      const codigo = generarCodigoVerificacion();
      setCodigoVerificacion(codigo); // Almacena el código generado en el estado
      console.log(destinatario);
      // Realiza una solicitud POST a la ruta de tu backend que envía correos electrónicos
      const response = await axios.post('http://localhost:4001/api/enviarMail/', {
        destinatario,
        asunto: 'Código de verificación',
        cuerpo: `Tu código de verificación es: ${codigo}`,
      });

      // Mostrar el modal después de enviar el correo
      console.log("Activnando modal");
    } catch (error) {
      console.error('Error al enviar el correo electrónico', error);
    }
  };

  const handleSubmitCodigo = () => {
    if (codigoIngresado === codigoVerificacion) {
      // Redirigir a la página "/Trabajos" si los códigos coinciden
      navigate('/consultartrabajos');
    } else {
      // Mostrar un mensaje de error si los códigos no coinciden
      setError('Los códigos de verificación no coinciden. Intente de nuevo.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg">
        <h1 className="text-xl mb-4">Código de verificación</h1>
        <p className="text-sm text-gray-600 mb-4">Por favor, ingrese su correo electrónico a continuación. Le enviaremos un código de verificación para poder iniciar sesión correctamente.</p>
        <label className="block mb-2">
          Correo electrónico:
          <input type="email" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} className="block w-full border-gray-300 rounded-md mt-1" />
        </label>
        <button onClick={handleEnvioCorreo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Enviar código de verificación</button>
      </div>
      
      {/* Modal */}
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg mb-4">Ingrese el código de verificación</h2>
            <input type="text" value={codigoIngresado} onChange={(e) => setCodigoIngresado(e.target.value)} className="block w-full border-gray-300 rounded-md mt-1 mb-4" />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button onClick={handleSubmitCodigo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Aceptar</button>
          </div>
        </div>
    </div>
  );
};

export default VerificarCorreo ;