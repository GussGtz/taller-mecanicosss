import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const Detalles = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    id: 0,
    descripcion: '',
    horas: 0,
    estado: '',
    tipo: '',
    costo: 0,
    costoPiezas: 0,
    detalles: '',
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/trabajos/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  return (
    <div>
      <Header />
      <h1>Detalles del trabajo</h1>
      <table>
        <tbody>
          <tr>
            <th>Nombre:</th> {/* Cambiamos "ID" por "Nombre" */}
            <td>{job.nombre}</td> {/* Mostramos el nombre del trabajo */}
          </tr>
          <tr>
            <th>Descripción:</th>
            <td>{job.descripcion}</td>
          </tr>
          <tr>
            <th>Horas trabajadas:</th>
            <td>{job.horas} hrs</td>
          </tr>
          <tr>
            <th>Precio fijo (350 pesos/hora):</th>
            <td>$ {job.horas * 350}.00</td>
          </tr>
          <tr>
            <th>Costo del material:</th>
            <td>$ {job.costoPiezas}.00</td>
          </tr>
          <tr>
            <th>Precio total:</th>
            <td>$ {job.horas * 350 + job.costoPiezas}.00</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => window.history.back()}>Regresar</button>
    </div>
  );
};

export default Detalles;
