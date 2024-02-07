import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/home.css'; // Asegúrate de que el archivo CSS esté correctamente vinculado
import Header from '../components/Header'; // Importa el componente Header

const Home = () => {
  const [trabajos, setTrabajos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/trabajos');
        setTrabajos(response.data);
      } catch (error) {
        console.error('Error fetching trabajos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="main-banner">
          {/* Asumiendo que tienes una imagen de fondo para el banner */}
          <h1>Mechannix</h1>
        </div>
        <section className="content-section">
          <h2>Trabajos</h2>
          <div className="content-grid">
            {/* Mapea los trabajos en los cards */}
            {trabajos.map(trabajo => (
              <div className="content-block" key={trabajo.id_trabajo}>
                <h3>{trabajo.nombre}</h3>
                <p>Precio: ${trabajo.horas * 350}.00</p> {/* Calcula el precio como horas * 350 */}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
