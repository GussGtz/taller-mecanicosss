import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../css/ActualizarTrabajo.css';

const ActualizarTrabajo = () => {
  const [idTrabajo, setIdTrabajo] = useState('');
  const [job, setJob] = useState(null);
  const [modalAumentarHorasOpen, setModalAumentarHorasOpen] = useState(false);
  const [horasAumentadas, setHorasAumentadas] = useState(0);

  useEffect(() => {
    if (idTrabajo) {
      axios.get(`http://localhost:4001/api/trabajos/${idTrabajo}`)
        .then(response => setJob(response.data))
        .catch(error => console.error('Error fetching job details:', error));
    }
  }, [idTrabajo]);

  const handleIdChange = (e) => {
    setIdTrabajo(e.target.value);
  };

  const handleAumentarHoras = () => {
    setModalAumentarHorasOpen(true);
  };

  const handleConfirmAumentarHoras = async () => {
    try {
      const response = await axios.post(`http://localhost:4001/api/trabajos/${idTrabajo}/aumentar-horas`, { horas: horasAumentadas });
      setJob(response.data); // Actualizar el estado local con los datos actualizados del trabajo
      setHorasAumentadas(0); // Reiniciar las horas aumentadas
      setModalAumentarHorasOpen(false); // Cerrar el modal
    } catch (error) {
      console.error('Error al aumentar horas:', error);
    }
  };

  const handleCancelar = () => {
    setIdTrabajo('');
    setJob(null);
    setModalAumentarHorasOpen(false);
    setHorasAumentadas(0);
    console.log('Operación cancelada');
  };

  return (
    <>
      <Header />
      <div className="actualizar-trabajo">
        <h1>Actualizar Trabajo</h1>
        <form>
          <div className="input-container">
            <label htmlFor="idTrabajo">Id del trabajo a actualizar</label>
            <input
              id="idTrabajo"
              type="text"
              value={idTrabajo}
              onChange={handleIdChange}
              placeholder="Ingrese id"
            />
          </div>
          <div className="button-container">
            <button type="button" onClick={handleAumentarHoras}>Aumentar horas</button>
            {/* Otros botones para otras acciones de actualización */}
            <button type="button" onClick={handleCancelar} className="cancelar">Cancelar</button>
          </div>
        </form>
        {job && (
          <div className="job-details">
            <h2>Detalles del Trabajo</h2>
            <p>ID: {job.id}</p>
            <p>Descripción: {job.descripcion}</p>
            <p>Horas trabajadas: {job.horas}</p>
            {/* Otros detalles del trabajo */}
            <div className="edit-hours">
              <label htmlFor="horasAumentadas">Aumentar horas:</label>
              <input
                id="horasAumentadas"
                type="number"
                value={horasAumentadas}
                onChange={(e) => setHorasAumentadas(parseInt(e.target.value))}
              />
              <button type="button" onClick={handleConfirmAumentarHoras}>Confirmar</button>
            </div>
          </div>
        )}
      </div>
      {/* Modal para confirmar el aumento de horas */}
      {modalAumentarHorasOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Aumento de Horas</h2>
            <p>¿Está seguro de que desea aumentar las horas para el trabajo ID: {idTrabajo}?</p>
            <div className="button-container">
              <button type="button" onClick={handleConfirmAumentarHoras}>Confirmar</button>
              <button type="button" onClick={() => setModalAumentarHorasOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActualizarTrabajo;
