import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/FormularioEstilo.css'; // Asegúrate de crear un archivo CSS con este nombre

const VerificarCorreo = () => {
  const [destinatario, setDestinatario] = useState('');
  const [codigoVerificacion, setCodigoVerificacion] = useState('');
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const generarCodigoVerificacion = () => String(Math.floor(1000 + Math.random() * 9000));

  const handleEnvioCorreo = async () => {
    if (!validateEmail(destinatario)) {
      setError('Por favor, ingrese un correo electrónico válido.');
      return;
    }
        try {
      const codigo = generarCodigoVerificacion();
      setCodigoVerificacion(codigo);
      await axios.post('http://localhost:4001/api/enviarMail/', {
        destinatario,
        asunto: 'Código de verificación',
        cuerpo: `Tu código de verificación es: ${codigo}`,
      });
      console.log("Correo enviado exitosamente.");
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      setError('Ocurrió un error al enviar el correo. Por favor, intente de nuevo.');
    }
  };

  const handleSubmitCodigo = () => {
    // Verificar si el campo del código de verificación está vacío
    if (!codigoIngresado) {
      setError('Por favor, ingrese el código de verificación.');
      return;
    }
  
    // Verificar si el código ingresado coincide con el código de verificación generado
    if (codigoIngresado === codigoVerificacion) {
      navigate('/consultartrabajos');
    } else {
      setError('Los códigos de verificación no coinciden. Intente de nuevo.');
    }
  };

  const validateEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="formulario-container">
      <div className="formulario">
        <h1 className="titulo">Código de verificación</h1>
        <p className="descripcion">
          Por favor, ingrese su correo electrónico a continuación.
          Le enviaremos un código de verificación para poder iniciar sesión correctamente.
        </p>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Ingrese su correo electrónico"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
          />
        </div>
        <button onClick={handleEnvioCorreo} className="btn-enviar">
          Enviar código de verificación
        </button>
        {error && <div className="error-message">{error}</div>}
        <div className="codigo-verificacion">
          <label htmlFor="codigo">Ingrese el código de verificación:</label>
          <input
            type="text"
            id="codigo"
            className="form-control"
            value={codigoIngresado}
            onChange={(e) => setCodigoIngresado(e.target.value)}
          />
          <button onClick={handleSubmitCodigo} className="btn-enviar">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificarCorreo;