import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MecanicosCrud = () => {
  const [mecanicos, setMecanicos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mecanicoSeleccionado, setMecanicoSeleccionado] = useState(null);

  useEffect(() => {
    obtenerMecanicos();
  }, []);

  const obtenerMecanicos = () => {
    axios.get('http://localhost:4001/api/mecanico')
      .then(response => setMecanicos(response.data))
      .catch(error => console.error('Error al obtener mecánicos:', error));
  };

  const eliminarMecanico = (idMecanico) => {
    axios.delete(`http://localhost:4001/api/mecanico/${idMecanico}`)
      .then(() => obtenerMecanicos())
      .catch(error => console.error('Error al eliminar mecánico:', error));
  };

  const editarMecanico = () => {
    axios.put(`http://localhost:4001/api/mecanico/${mecanicoSeleccionado.id_mecanico}`, mecanicoSeleccionado)
      .then(() => {
        obtenerMecanicos();
        setModalIsOpen(false);
      })
      .catch(error => console.error('Error al editar mecánico:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMecanicoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const abrirModalEdicion = (mecanico) => {
    setMecanicoSeleccionado(mecanico);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <h1>Consultar y actualizar mecánicos</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mecanicos.map((mecanico) => (
            <tr key={mecanico.id_mecanico}>
              <td>{mecanico.id_mecanico}</td>
              <td>{mecanico.nombre}</td>
              <td>{mecanico.especialidad}</td>
              <td>{mecanico.usuario}</td>
              <td>{mecanico.contrasena}</td>
              <td>{mecanico.rol}</td>
              <td>
                <button onClick={() => abrirModalEdicion(mecanico)}>Editar</button>
                <button onClick={() => eliminarMecanico(mecanico.id_mecanico)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Mecánico"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Editar Mecánico</h2>
        <form>
          <div className="input-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" onChange={handleInputChange} value={mecanicoSeleccionado ? mecanicoSeleccionado.nombre : ''} />
          </div>
          <div className="input-group">
            <label htmlFor="especialidad">Especialidad:</label>
            <input type="text" id="especialidad" name="especialidad" onChange={handleInputChange} value={mecanicoSeleccionado ? mecanicoSeleccionado.especialidad : ''} />
          </div>
          <div className="input-group">
            <label htmlFor="usuario">Usuario:</label>
            <input type="text" id="usuario" name="usuario" onChange={handleInputChange} value={mecanicoSeleccionado ? mecanicoSeleccionado.usuario : ''} />
          </div>
          <div className="input-group">
            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" onChange={handleInputChange} value={mecanicoSeleccionado ? mecanicoSeleccionado.contrasena : ''} />
          </div>
          <div className="input-group">
            <label htmlFor="rol">Rol:</label>
            <select id="rol" name="rol" onChange={handleInputChange} value={mecanicoSeleccionado ? mecanicoSeleccionado.rol : ''}>
              <option value="Mecánico general">Mecánico general</option>
              <option value="Mecánico administrador">Mecánico administrador</option>
            </select>
          </div>
          <div className="button-group">
            <button type="button" onClick={editarMecanico}>Guardar Cambios</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MecanicosCrud;
