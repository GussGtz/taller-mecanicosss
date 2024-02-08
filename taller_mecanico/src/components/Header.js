import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  const logoUrl = "https://files.oaiusercontent.com/file-P6NgoliPziVP6mBZqzxU6q2a?se=2024-01-31T16%3A23%3A32Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D5f2bc96a-5043-462e-a0be-13dbd733236c.webp&sig=6RG4arQMTr/fpNBz83Wa14jcIVURQ1Hx/YKWOzvSBZo%3D";
  const userProfileIcon = "https://cdn.icon-icons.com/icons2/877/PNG/512/male-profile-picture_icon-icons.com_68388.png";

  const handleProfileClick = () => {
    console.log("Perfil clickeado");
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
    </div>
  );
};

export default Header;
