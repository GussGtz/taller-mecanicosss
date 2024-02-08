import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Header from '../components/Header';
import '../css/consultartrabajos.css';

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
    estado: 'Inactivo',
    horas: 0,
    piezas: [], // Lista de piezas seleccionadas para el trabajo
    // Otros campos según tu modelo de datos
  });
  
  const [piezasDisponibles, setPiezasDisponibles] = useState([]); // Estado para almacenar las piezas disponibles y su precio
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener las piezas disponibles al cargar el componente
    axios.get('http://localhost:4001/api/piezas')
      .then(response => setPiezasDisponibles(response.data))
      .catch(error => console.error('Error fetching piezas:', error));
    
    // Obtener los trabajos al cargar el componente
    axios.get('http://localhost:4001/api/trabajos')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const displayJobs = () => {
    return jobs.map((job) => (
      <tr key={job.id_trabajo}>
        <td>{job.id_trabajo}</td>
        <td>{job.nombre}</td>
        <td>{job.descripcion}</td>
        <td>{job.horas}</td>
        <td>{job.estado}</td>
        <td>{job.tipo_de_trabajo}</td>
        <td>{job.horas * 350}</td>
        <td>
          <button onClick={() => handleDetails(job)}>Detalles</button>
          <button onClick={() => handleUpdate(job)}>Actualizar</button>
          <button onClick={() => handleDelete(job.id_trabajo)}>Eliminar</button>
        </td>
      </tr>
    ));
  };

  const handleDetails = (job) => {
    // Aquí puedes implementar la lógica para mostrar los detalles del trabajo seleccionado
  };

  const handleUpdate = (job) => {
    setSelectedJob(job);
    setNewJob(job); // Establecer el trabajo seleccionado como el nuevo trabajo para editar
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
      piezas: [],
      // Otros campos según tu modelo de datos
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePiezasChange = (e) => {
    const selectedPiezas = Array.from(e.target.selectedOptions, option => ({
      id_pieza: option.value,
      precio: parseFloat(option.dataset.precio) // Agregar el precio como un atributo de datos en el option
    }));
    setNewJob(prevState => ({
      ...prevState,
      piezas: selectedPiezas.map(pieza => pieza.id_pieza) // Solo guardar los IDs de las piezas en el trabajo
    }));
  };

  

  const agregarTrabajo = async () => {
    // Verificar si todos los campos obligatorios están llenos
    if (!newJob.nombre || !newJob.descripcion || !newJob.tipo_de_trabajo || newJob.horas <= 0) {
      alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
      return;
    }
  
    try {
      // Calcular el precio automáticamente multiplicando el número de horas por $350 y sumar el precio de las piezas
      const costoPorHoras = newJob.horas * 350;
      const costoPiezas = newJob.piezas.reduce((total, pieza) => total + pieza.precio, 0);
      const costoTotal = costoPorHoras + costoPiezas;
  
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
        <option value="Reparación">Reparación</option>
        <option value="Revisión">Revisión</option>
      </select>
    </div>
    <div className="input-group">
      <label htmlFor="horas">Horas:</label>
      <input type="number" id="horas" name="horas" onChange={handleInputChange} value={newJob.horas} />
    </div>
    <div className="input-group">
      <label htmlFor="estado">Estado:</label>
      <input type="text" id="estado" name="estado" onChange={handleInputChange} value={newJob.estado} />
    </div>
    <div className="input-group">
      <label htmlFor="piezas">Piezas:</label>
      <select
        id="piezas"
        name="piezas"
        onChange={handlePiezasChange}
        multiple
      >
        {piezasDisponibles.map(pieza => (
          <option key={pieza.id_pieza} value={pieza.id_pieza} data-precio={pieza.precio}>{pieza.nombre}</option>
        ))}
      </select>
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
