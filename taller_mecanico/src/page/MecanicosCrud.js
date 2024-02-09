import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/mecanicos'; // Reemplaza esto con la URL de tu API

const MecanicosCrud = () => {
  const [mecanicos, setMecanicos] = useState([]);
  const [nuevoMecanico, setNuevoMecanico] = useState({
    nombre: '',
    especialidad: '',
    usuario: '',
    contrasena: '',
    rol: 'Mecánico general'
  });

  useEffect(() => {
    obtenerMecanicos();
  }, []);

  const obtenerMecanicos = () => {
    axios.get(API_URL)
      .then(response => setMecanicos(response.data))
      .catch(error => console.error('Error al obtener mecánicos:', error));
  };

  const agregarMecanico = () => {
    axios.post(API_URL, nuevoMecanico)
      .then(() => {
        obtenerMecanicos();
        setNuevoMecanico({
          nombre: '',
          especialidad: '',
          usuario: '',
          contrasena: '',
          rol: 'Mecánico general',
        });
      })
      .catch(error => console.error('Error al agregar mecánico:', error));
  };

  const eliminarMecanico = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => obtenerMecanicos())
      .catch(error => console.error('Error al eliminar mecánico:', error));
  };

  return (
    <div>
      <h1>CRUD de Mecánicos</h1>

      <h2>Lista de Mecánicos</h2>
      <ul>
        {mecanicos.map(mecanico => (
          <li key={mecanico.id_mecanico}>
            {mecanico.nombre} - {mecanico.especialidad}
            <button onClick={() => eliminarMecanico(mecanico.id_mecanico)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Agregar Mecánico</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nuevoMecanico.nombre} onChange={(e) => setNuevoMecanico({ ...nuevoMecanico, nombre: e.target.value })} />

        <label>Especialidad:</label>
        <input type="text" value={nuevoMecanico.especialidad} onChange={(e) => setNuevoMecanico({ ...nuevoMecanico, especialidad: e.target.value })} />

        <label>Usuario:</label>
        <input type="text" value={nuevoMecanico.usuario} onChange={(e) => setNuevoMecanico({ ...nuevoMecanico, usuario: e.target.value })} />

        <label>Contraseña:</label>
        <input type="password" value={nuevoMecanico.contrasena} onChange={(e) => setNuevoMecanico({ ...nuevoMecanico, contrasena: e.target.value })} />

        <label>Rol:</label>
        <select value={nuevoMecanico.rol} onChange={(e) => setNuevoMecanico({ ...nuevoMecanico, rol: e.target.value })}>
          <option value="Mecánico general">Mecánico general</option>
          <option value="Mecánico administrador">Mecánico administrador</option>
        </select>

        <button onClick={agregarMecanico}>Agregar</button>
      </div>
    </div>
  );
};

export default MecanicosCrud;