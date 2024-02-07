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
  const [newJob, setNewJob] = useState({
    id_mecanico: 1,
    id_cliente: 1,
    fecha: '',
    nombre: '',
    descripcion: '',
    tipo_de_trabajo: '',
    estado: 'Inactivo',
    horas: 0,
    // Otros campos según tu modelo de datos
  });

  const navigate = useNavigate();

  useEffect(() => {
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
        <td>{job.horas * 350}</td> {/* Calcular el precio basado en las horas */}
        <td>
          <button onClick={() => navigate(`/detalles/${job.id_trabajo}`)}>Ver detalles</button>
        </td>
      </tr>
    ));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevState => ({ ...prevState, [name]: value }));
  };

  const agregarTrabajo = async () => {
    try {
      // Calcular el precio automáticamente multiplicando el número de horas por $350
      const costo = newJob.horas * 350;

      const response = await axios.post('http://localhost:4001/api/trabajos', { ...newJob, costo });
      setJobs([...jobs, response.data]);
      setModalIsOpen(false);

      setNewJob({
        id_mecanico: 1,
        id_cliente: 1,
        fecha: '',
        nombre: '',
        descripcion: '',
        tipo_de_trabajo: '',
        estado: 'Inactivo',
        horas: 0,
        // Otros campos según tu modelo de datos
      });
    } catch (error) {
      console.error('Error al agregar trabajo:', error);
    }
  };

  return (
    <div className="container">
      <Header />
      <h1>Consultar y actualizar trabajos</h1>
      <h2>Consultar y actualizar trabajos</h2>
      <button onClick={openModal}>Agregar Trabajo</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Trabajo"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Agregar Trabajo</h2>
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
          {/* No se incluye campo para el precio */}
          <div className="button-group">
            <button type="button" onClick={agregarTrabajo}>Aplicar</button>
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
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>{displayJobs()}</tbody>
      </table>
    </div>
  );
};

export default ConsultarTrabajos;
