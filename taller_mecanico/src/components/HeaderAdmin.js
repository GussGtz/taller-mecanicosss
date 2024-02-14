import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin'); // Asegúrate de que esto coincide con cómo guardas la sesión de admin
    navigate('/'); // Usa navigate para redirigir a la página de inicio de sesión o principal
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      background: '#007bff',
      color: '#fff',
      padding: '10px 20px',
    }}>
      <button onClick={handleLogout} style={{
        padding: '5px 15px',
        fontSize: '16px',
        color: '#007bff',
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }} onMouseOver={e => e.target.style.backgroundColor = '#0069d9'} onMouseOut={e => e.target.style.backgroundColor = '#fff'}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default HeaderAdmin;