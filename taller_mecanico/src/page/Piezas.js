import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Header from '../components/Header';

// import '../css/consultarpiezas.css'; // Asegúrate de importar el archivo CSS correspondiente

Modal.setAppElement('#root');

const ConsultarPiezas = () => {
  const [piezas, setPiezas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newPieza, setNewPieza] = useState({
    nombre: '',
    descripcion: '',
    costo: 0,
    // Otros campos según tu modelo de datos
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4001/api/piezas')
      .then(response => setPiezas(response.data))
      .catch(error => console.error('Error fetching piezas:', error));
  }, []);

  const displayPiezas = () => {
    return piezas.map((pieza) => (
      <tr key={pieza.id_pieza}>
        <td>{pieza.id_pieza}</td>
        <td>{pieza.nombre}</td>
        <td>{pieza.descripcion}</td>
        <td>{pieza.costo}</td>
        {/* Otros campos de la pieza */}
        <td>
          <button className="eliminar" onClick={() => eliminarPieza(pieza.id_pieza)}>Eliminar Pieza</button>
        </td>
      </tr>
    ));
  };

  const eliminarPieza = async (idPieza) => {
    try {
      await axios.delete(`http://localhost:4001/api/piezas/${idPieza}`);
      setPiezas(piezas.filter(pieza => pieza.id_pieza !== idPieza));
    } catch (error) {
      console.error('Error al eliminar pieza:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPieza(prevState => ({ ...prevState, [name]: value }));
  };

  const agregarPieza = async () => {
    try {
      const response = await axios.post('http://localhost:4001/api/piezas', newPieza);
      setPiezas([...piezas, response.data]);
      setModalIsOpen(false);

      setNewPieza({
        nombre: '',
        descripcion: '',
        costo: 0,
        // Otros campos según tu modelo de datos
      });
    } catch (error) {
      console.error('Error al agregar pieza:', error);
    }
  };

  return (
    <div className="container">
      <Header />
      <h1>Consultar y actualizar piezas</h1>
      <button onClick={openModal}>Agregar Pieza</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Pieza"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Agregar Pieza</h2>
        <form>
          <div className="input-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" onChange={handleInputChange} value={newPieza.nombre} />
          </div>
          <div className="input-group">
            <label htmlFor="descripcion">Descripción:</label>
            <input type="text" id="descripcion" name="descripcion" onChange={handleInputChange} value={newPieza.descripcion} />
          </div>
          <div className="input-group">
            <label htmlFor="costo">Costo:</label>
            <input type="number" id="costo" name="costo" onChange={handleInputChange} value={newPieza.costo} />
          </div>
          {/* Otros campos según tu modelo de datos */}
          <div className="button-group">
            <button type="button" onClick={agregarPieza}>Agregar</button>
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
            <th>Costo</th>
            {/* Otros campos de la pieza */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{displayPiezas()}</tbody>
      </table>
    </div>
  );
};

export default ConsultarPiezas;
