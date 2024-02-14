import React from 'react';
import Header from '../components/Header'; // Asegúrate de que la ruta sea correcta
import '../css/TablaMecanicos.css'; // Asegúrate de que el nombre del archivo CSS coincida

const data = [
  // Supondremos que tienes algunos datos aquí. Si no, la tabla estará vacía inicialmente.
];

const Table = () => {
  return (
    <div className="table-container">
      <Header /> {/* Esto inserta tu componente Header */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Id_Mecanico</th>
              <th>Nombre</th>
              <th>Propiedad</th>
              <th>Dueño</th>
              <th>Contacto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id_mecanico}</td>
                <td>{item.nombre}</td>
                <td>{item.propiedad}</td>
                <td>{item.dueño}</td>
                <td>{item.contacto}</td>
                <td>
                  <button className="button-edit">Editar</button>
                  <button className="button-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;