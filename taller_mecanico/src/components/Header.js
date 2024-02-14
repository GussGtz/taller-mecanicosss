import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  const logoUrl = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6IXx7S5M2ahWLEY0CXEp4NpKL09rVEjgD1_GO7FxyhRee24jA";
  const userProfileIcon = "https://cdn.icon-icons.com/icons2/877/PNG/512/male-profile-picture_icon-icons.com_68388.png";

  const handleProfileClick = () => {
    console.log("Perfil clickeado");
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar la sesión
    // Por ejemplo, limpiar el token de autenticación del localStorage
    localStorage.removeItem('mecanico');
    // Luego redirigir al usuario a la página de inicio de sesión
    window.location.href = '/';
  };

  return (
    <div className="header-container">
      <Link to="/">
        <img src={logoUrl} alt="Mechaniix Pro" className="header-logo" />
      </Link>
      <div className="header-buttons">
        <Link to="/ConsultarTrabajos" className="header-button">Consultar trabajo</Link>
        <Link to="/Piezas" className="header-button">Piezas</Link>
        <Link to="/Home" className="header-button">Home</Link>
      </div>
      <button onClick={handleProfileClick} className="header-profile-btn">
        <img src={userProfileIcon} alt="Perfil" className="profile-icon" />
      </button>
      {/* Botón de cierre de sesión */}
      <button onClick={handleLogout} className="header-logout-btn">Cerrar Sesión</button>
    </div>
  );
};

export default Header;
