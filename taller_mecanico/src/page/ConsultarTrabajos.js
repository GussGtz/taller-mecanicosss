import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Header from '../components/Header';
import '../css/consultartrabajos.css';
import '../css/Modals.css'

Modal.setAppElement('#root');

const ConsultarTrabajos = () => {
  const [jobs, setJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // Estado para almacenar el trabajo seleccionado para actualizar
  const [newJob, setNewJob] = useState({
    id_mecanico: 1,
    id_cliente: 1,
    fecha: '',
    nombre: '',
    descripcion: '',
    tipo_de_trabajo: '',
    estado: 'En proceso',
    horas: 0,
    costoPiezas: 0, // Nuevo campo para el costo de las piezas
    // Otros campos según tu modelo de datos
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los trabajos al cargar el componente
    axios.get('http://localhost:4001/api/trabajos')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const displayJobs = () => {
    const sortedJobs = jobs.slice().sort((a, b) => a.id_trabajo - b.id_trabajo);

    return sortedJobs.map((job) => (
      <tr key={job.id_trabajo}>
        <td>{job.id_trabajo}</td>
        <td>{job.nombre}</td>
        <td>{job.descripcion}</td>
        <td>{job.horas}</td>
        <td>{job.estado}</td>
        <td>{job.tipo_de_trabajo}</td>
        <td>{job.costo}</td>
        <td>
          <button onClick={() => handleDetails(job)}>Detalles</button>
          <button onClick={() => handleUpdate(job)}>Actualizar</button>
          <button onClick={() => handleDelete(job.id_trabajo)}>Eliminar</button>
        </td>
      </tr>
    ));
  };

  const handleDetails = (job) => {
    // Implementa la lógica para mostrar los detalles del trabajo seleccionado
  };

  const handleUpdate = (job) => {
    if (!job.nombre || !job.descripcion || !job.tipo_de_trabajo || job.horas <= 0 || typeof job.costoPiezas === 'undefined') {
      alert("No se puede actualizar un trabajo con campos vacíos o sin costo de piezas. Asegúrese de completar todos los campos.");
      return;
    }
  
    if (job.estado === 'Terminado') {
      alert("No se puede actualizar un trabajo que ya está terminado.");
      return;
    }
  
    setSelectedJob(job);
    setNewJob(job);
    setModalIsOpen(true);
  };
  
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este trabajo?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4001/api/trabajos/${id}`);
      setJobs(jobs.filter(job => job.id_trabajo !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedJob(null);
    setNewJob({
      id_mecanico: 1,
      id_cliente: 1,
      fecha: '',
      nombre: '',
      descripcion: '',
      tipo_de_trabajo: '',
      estado: 'Inactivo',
      horas: 0,
      costoPiezas: 0, // Reiniciar el costo de las piezas al cerrar el modal
      // Otros campos según tu modelo de datos
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevState => ({ ...prevState, [name]: value }));
  };
  const agregarTrabajo = async () => {
    if (!newJob.nombre || !newJob.descripcion || !newJob.tipo_de_trabajo || newJob.horas <= 0) {
      alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
      return;
    }
  
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharsRegex.test(newJob.nombre) || specialCharsRegex.test(newJob.descripcion) || specialCharsRegex.test(newJob.estado)) {
      alert("No se permiten caracteres especiales en el nombre, descripción o estado.");
      return;
    }
  
    let costoTotal = 0;
  
    switch (newJob.tipo_de_trabajo) {
      case "Reparación mecánica":
        costoTotal = (newJob.horas * 350) * 1.1 + parseFloat(newJob.costoPiezas);
        break;
      case "Reparación de chapa y pintura":
        costoTotal = (newJob.horas * 350) * 1.3 + parseFloat(newJob.costoPiezas);
        break;
      case "Revisión":
        costoTotal = 450;
        break;
      default:
        break;
    }
  
    console.log("Costo total antes de enviar la solicitud:", costoTotal);
  
    try {
      if (selectedJob) {
        await axios.put(`http://localhost:4001/api/trabajos/${selectedJob.id_trabajo}`, { ...newJob, costo: costoTotal });
        const updatedJobs = jobs.map(job => {
          if (job.id_trabajo === selectedJob.id_trabajo) {
            return { ...newJob, costo: costoTotal };
          }
          return job;
        });
        setJobs(updatedJobs);
      } else {
        const response = await axios.post('http://localhost:4001/api/trabajos', { ...newJob, costo: costoTotal });
        setJobs([...jobs, { ...response.data, costo: costoTotal }]);
      }
  
      closeModal();
    } catch (error) {
      console.error('Error adding/updating job:', error);
    }
  };
  
  
  return (
    <div className="container">
      <Header />
      <h1>Consultar y actualizar trabajos</h1>
      <h2>Consultar y actualizar trabajos</h2>
      <button onClick={() => setModalIsOpen(true)}>Agregar Trabajo</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={selectedJob ? "Actualizar Trabajo" : "Agregar Trabajo"}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{selectedJob ? 'Actualizar Trabajo' : 'Agregar Trabajo'}</h2>
        <form>
          <div className="input-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" onChange={handleInputChange} value={newJob.nombre} />
          </div>
          <div className="input-group">
            <label htmlFor="descripcion">Descripción:</label>
            <input type="text" id="descripcion" name="descripcion" onChange={handleInputChange} value={newJob.descripcion} />
          </div>
          <div className="input-group">
  <label htmlFor="tipo_de_trabajo">Tipo de Trabajo:</label>
  <select
    id="tipo_de_trabajo"
    name="tipo_de_trabajo"
    onChange={handleInputChange}
    value={newJob.tipo_de_trabajo || ''}
  >
    <option value="">Seleccionar Tipo</option>
    <option value="Reparación mecánica">Reparación mecánica</option>
    <option value="Reparación de chapa y pintura">Reparación de chapa y pintura</option>
    <option value="Revisión">Revisión</option>
  </select>
</div>
          <div className="input-group">
            <label htmlFor="horas">Horas:</label>
            <input type="number" id="horas" name="horas" onChange={handleInputChange} value={newJob.horas} />
          </div>
          <div className="input-group">
  <label htmlFor="estado">Estado:</label>
  <select
    id="estado"
    name="estado"
    onChange={handleInputChange}
    value={newJob.estado || ''}
  >
    <option value="">Seleccionar Estado</option>
    <option value="En Proceso">En Proceso</option>
    <option value="Terminado">Terminado</option>
  </select>
</div>
          <div className="input-group">
            <label htmlFor="costoPiezas">Costo de las Piezas:</label>
            <input type="number" id="costoPiezas" name="costoPiezas" onChange={handleInputChange} value={newJob.costoPiezas} />
          </div>
          <div className="button-group">
            <button type="button" onClick={agregarTrabajo}>{selectedJob ? 'Actualizar' : 'Agregar'}</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </Modal>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Horas</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{displayJobs()}</tbody>
      </table>
    </div>
  );
};


export default ConsultarTrabajos;
