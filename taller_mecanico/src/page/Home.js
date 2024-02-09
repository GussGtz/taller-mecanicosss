import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';
import Header from '../components/Header';

const Home = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/trabajos');
        setTrabajos(response.data.slice(0, 6));

        if (response.data.length > 6) {
          setShowMore(true);
        }
      } catch (error) {
        console.error('Error fetching trabajos:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowMore = () => {
    setTrabajos(trabajos => trabajos.concat(trabajos.slice(trabajos.length)));
    setShowMore(false);
    navigate('/ConsultarTrabajos');
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="main-banner">
          <h1>Mechannix</h1>
        </div>
        <section className="content-section">
          <h2>Trabajos</h2>
          <div className="content-grid">
            {trabajos.map(trabajo => (
              <div className="content-block" key={trabajo.id_trabajo}>
                <h3>{trabajo.nombre}</h3>
                <p>Precio: ${trabajo.horas * 350}.00</p>
              </div>
            ))}
          </div>
          {showMore && (
            <button onClick={handleShowMore}>Ver más</button>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;