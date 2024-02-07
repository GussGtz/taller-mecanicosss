import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import '../css/login.css';

import axios from 'axios';

const login = async (usuario, contraseña) => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión de la API
    const response = await axios.post('http://localhost:4001/api/login', {
      usuario: usuario,
      contraseña: contraseña
    });

    // Verifica si la respuesta tiene el mensaje "Inicio de sesión exitoso"
    if (response.data.message === 'Inicio de sesión exitoso') {
      return true;
    } else {
      // Si el mensaje es diferente, se considera que el inicio de sesión falló
      return false;
    }
  } catch (error) {
    // Si hay un error en la solicitud, lo maneja aquí
    console.error('Error en la solicitud de inicio de sesión:', error);
    throw error; // Lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};


const Login = ( ) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Usuario: ${usuario}, Contraseña: ${password}`);
    login({ usuario, password });
  };

  const logoUrl = 'https://files.oaiusercontent.com/file-P6NgoliPziVP6mBZqzxU6q2a?se=2024-01-31T16%3A23%3A32Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D5f2bc96a-5043-462e-a0be-13dbd733236c.webp&sig=6RG4arQMTr/fpNBz83Wa14jcIVURQ1Hx/YKWOzvSBZo%3D';

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="logo-container">
          <img src={logoUrl} alt="Mechaniix Pro" />
        </div>
        <h2>Inicio de sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">
            Iniciar Sesión
          </button>
          <div className="options-container">
            <hr />
            <span>O</span>
            <hr />
          </div>
          <Link to="/register" className="secondary-btn">Nuevo Usuario</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
