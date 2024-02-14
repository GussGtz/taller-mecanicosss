import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

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
        console.log(response.data.usuario.rol_id);

        // Guardar los datos del mecánico en localStorage
        localStorage.setItem('id_mecanico', response.data.usuario.id_usuario);
        localStorage.setItem('mecanico', JSON.stringify(response.data.usuario));
        localStorage.setItem('rol', response.data.usuario.rol_id);


        if (response.data.usuario.rol_id === 'Mecánico general') {
          console.log('Redirigiendo a /VerificarCorreo');
          window.location.href = '/VerificarCorreo';
        } else if (response.data.usuario.rol_id === 'Mecánico administrador') {
          console.log('Redirigiendo a /MecanicosCrud');
          window.location.href = '/MecanicosCrud';
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      // Manejar el error según tus necesidades, puedes mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div
    className="flex h-screen flex-col items-center justify-center"
    style={{
      backgroundImage: `url('https://www.serpresur.com/wp-content/uploads/2023/06/serpresur-riesgos-mas-comunes-en-un-taller-mecanico-2-scaled.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      

      <div className="max-w-md mx-auto bg-white p-8 border-2 rounded">
        <h2 className="text-2xl text-center mb-4">INICIO SESIÓN</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="username">
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
            <label className="block text-sm font-semibold mb-2" htmlFor="password">
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

          <button type="submit" className="w-full bg-cyan-800 text-white p-2 rounded">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
