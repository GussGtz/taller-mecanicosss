import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import "../css/Nuevologin.css";
import "../css/login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4001/api/login', {
        nombre_usuario: username,
        contrasena: password,
      });

      if (response.data.error) {
        console.error('Error en la consulta:', response.data.error);
        // Manejar el error según tus necesidades, puedes mostrar un mensaje al usuario, etc.
      } else {
        console.log('Inicio de sesión exitoso', response.data);
       // window.location.href="/Home"
       console.log(response.data.usuario.rol_id);

        // Agregar la condición de redirección según el rol
        if (response.data.usuario.rol_id === "Mecánico general") {
          console.log('Redirigiendo a /Home');
          // navigate('/Home');
          window.location.href="/Home"

        } else if (response.data.usuario.rol_id === "Mecánico administrador") {
          console.log('Redirigiendo a /MecanicosCrud');
          // navigate('/Piezas');
          window.location.href="/MecanicosCrud"
          

        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      // Manejar el error según tus necesidades, puedes mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex items-center justify-center h-screen w-2/5 bg-white p-8">
        <div className="max-w-md mx-auto border-2 rounded">
          <h2 className="text-2xl text-center">INICIO SESIÓN</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="username"
              >
                USUARIO
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border-2 border-gray rounded"
                placeholder="Usuario"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="password"
              >
                CONTRASEÑA
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-2 border-gray rounded"
                placeholder="Contraseña"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-800 text-white p-2 rounded"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>

      <div className="flex-auto w-3/5 bg-gray-300"></div>
    </div>
  );
}

export default Login;