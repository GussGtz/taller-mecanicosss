import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminAuthChecker = ({ element }) => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('mecanico');
  // Verificar si el usuario tiene el rol de "Mecánico administrador"
  const isAdmin = localStorage.getItem('rol') === 'Mecánico administrador';
  console.log(isAdmin);

  // Si el usuario está autenticado y es administrador, permitir el acceso
//   if (isAuthenticated && isAdmin) {
    if (isAdmin) {
        return element;
  } else {
    // Si el usuario no está autenticado o no es administrador, redirigir al inicio de sesión
    return <Navigate to="/home" />;
  }
};

export default AdminAuthChecker;
