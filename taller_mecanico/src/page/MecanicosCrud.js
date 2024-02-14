import React, { useState, useEffect, Navigate} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import HeaderAdmin from '../components/HeaderAdmin';
import "../css/MecanicosCrud.css"; 

Modal.setAppElement('#root');

const MecanicosCrud = () => {
  const [mecanicos, setMecanicos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mecanicoSeleccionado, setMecanicoSeleccionado] = useState(null);
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [nuevoMecanico, setNuevoMecanico] = useState({
    nombre: '',
    especialidad: '',
    usuario: '',
    contrasena: '',
    rol: '',
  });
  


  useEffect(() => {
    obtenerMecanicos();
  }, []);

  const obtenerMecanicos = () => {
    axios.get('http://localhost:4001/api/mecanico')
      .then(response => setMecanicos(response.data))
      .catch(error => console.error('Error al obtener mecánicos:', error));
  };

  const validarCaracteresEspeciales = (texto) => {
    // Expresión regular para buscar caracteres especiales: < > / { } ( )
    const caracteresEspeciales = /[<>/{()}]/;
    return caracteresEspeciales.test(texto);
  };



  
  const handleNuevoMecanicoChange = (e) => {
    const { name, value } = e.target;
    if (!validarCaracteresEspeciales(value)) {
      setNuevoMecanico((prevMecanico) => ({
        ...prevMecanico,
        [name]: value,
        
      }));
    } else {
      alert("El campo contiene caracteres especiales no permitidos.");
    }
  };
  

  const eliminarMecanico = (idMecanico) => {
    axios.delete(`http://localhost:4001/api/mecanico/${idMecanico}`)
      .then(() => {
        obtenerMecanicos();
        alert("Mecánico eliminado correctamente");
      })
      .catch(error => console.error('Error al eliminar mecánico:', error));
  };

  // localStorage.setItem('mecanico', JSON.stringify(response.data.usuario));


  const editarMecanico = () => {
    const idUsuario = localStorage.getItem('id_mecanico');
    const idMecanico = parseInt(idUsuario);
    console.log(idUsuario);
    console.log(mecanicoSeleccionado.id_mecanico);
    console.log(idMecanico);

    if ( mecanicoSeleccionado.id_mecanico === idMecanico){

      axios.put(`http://localhost:4001/api/mecanico/${mecanicoSeleccionado.id_mecanico}`, mecanicoSeleccionado)
      .then(() => {
        obtenerMecanicos();
        setModalIsOpen(false);
        alert("Mecánico actualizado correctamente");
      })
      .catch(error => console.error('Error al editar mecánico:', error));

      // localStorage.setItem('rol', response.data.usuario.rol_id);
      console.log(mecanicoSeleccionado.rol);

      if (mecanicoSeleccionado.rol === "Mecánico general"){
        localStorage.setItem('rol', "Mecánico general");
        console.log(mecanicoSeleccionado.rol);

        window.location.href="/home";
        
      }

    }
    else{
      axios.put(`http://localhost:4001/api/mecanico/${mecanicoSeleccionado.id_mecanico}`, mecanicoSeleccionado)
      .then(() => {
        obtenerMecanicos();
        setModalIsOpen(false);
        alert("Mecánico actualizado correctamente");

      })
      .catch(error => console.error('Error al editar mecánico:', error));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMecanicoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  

  const agregarMecanico = () => {
    // Verificar si algún campo está vacío
    if (
      nuevoMecanico.nombre.trim() === '' ||
      nuevoMecanico.especialidad.trim() === '' ||
      nuevoMecanico.usuario.trim() === '' ||
      nuevoMecanico.contrasena.trim() === '' ||
      nuevoMecanico.rol.trim() === ''
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    axios.post('http://localhost:4001/api/mecanico', nuevoMecanico)
      .then((response) => {
        console.log(response.data.message);
        // Limpiar el formulario después de agregar un nuevo mecánico
        setNuevoMecanico({
          nombre: '',
          especialidad: '',
          usuario: '',
          contrasena: '',
          rol: '',
        });
        // Cerrar el modal después de agregar un nuevo mecánico
        setModalAgregarAbierto(false);
        // Actualizar la lista de mecánicos
        obtenerMecanicos();
        alert("Mecánico agregado correctamente");
      })
      .catch((error) => {
        console.error('Error al agregar nuevo mecánico:', error);
      });
  };
   
  

  const abrirModalEdicion = (mecanico) => {
    setMecanicoSeleccionado(mecanico);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const abrirModalAgregar = () => {
  setModalAgregarAbierto(true);
};





  return (
    <>
<HeaderAdmin/>
    <div className="container">
      <h1>Consultar y actualizar mecánicos</h1>

      <button onClick={abrirModalAgregar}>Agregar Mecánico</button>


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
            <input type="text" id="contrasena" name="contrasena" onChange={handleInputChange} value={mecanicoSeleccionado ? mecanicoSeleccionado.contrasena : ''} />
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

      <Modal
  isOpen={modalAgregarAbierto}
  onRequestClose={closeModal}
  contentLabel="Agregar Mecánico"
  className="modal"
  overlayClassName="overlay"
>
  <h2>Agregar Mecánico</h2>
  <form>
    <div className="input-group">
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" value={nuevoMecanico.nombre} onChange={handleNuevoMecanicoChange} />
    </div>
    <div className="input-group">
      <label htmlFor="especialidad">Especialidad:</label>
      <input type="text" id="especialidad" name="especialidad" value={nuevoMecanico.especialidad} onChange={handleNuevoMecanicoChange} />
    </div>
    <div className="input-group">
      <label htmlFor="usuario">Usuario:</label>
      <input type="text" id="usuario" name="usuario" value={nuevoMecanico.usuario} onChange={handleNuevoMecanicoChange} />
    </div>
    <div className="input-group">
      <label htmlFor="contrasena">Contraseña:</label>
      <input type="text" id="contrasena" name="contrasena" value={nuevoMecanico.contrasena} onChange={handleNuevoMecanicoChange} />
    </div>
    <div className="input-group">
      <label htmlFor="rol">Rol:</label>
      <select id="rol" name="rol" value={nuevoMecanico.rol} onChange={handleNuevoMecanicoChange}>
      <option value="">Seleccionar Rol</option>
        <option value="Mecánico general">Mecánico general</option>
        <option value="Mecánico administrador">Mecánico administrador</option>
      </select>
    </div>
    <div className="button-group">
      <button type="button" onClick={agregarMecanico}>Guardar</button>
      <button type="button" onClick={() => setModalAgregarAbierto(false)}>Cancelar</button>
    </div>
  </form>
</Modal>


    </div>
    </>
  );
};

export default MecanicosCrud;
