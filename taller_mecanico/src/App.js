import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import Register from './page/Register';
import Home from './page/Home';
import JobForm from './page/JobForm';
import ConsultarTrabajos from './page/ConsultarTrabajos';
import Detalles from './page/Detalles';
import Seguimiento from './page/Seguimiento';
import Trabajos from './page/Trabajos';
import ActualizarTrabajo from './page/ActualizarTrabajo';
import ACTrabajos from './page/ACTrabajos';
import Piezas from './page/Piezas'; // Importa el componente ConsultarPiezas
import MecanicosCrud from './page/MecanicosCrud';
import AuthChecker from './privateRoutes'; 
import AdminAuthChecker from './AdminAuthChecker';
import VerificarCorreo from './page/VerificarCorreo';


const App = () => {
  const handleLogin = (userData) => {
    console.log('Usuario autenticado:', userData);
  };

  const handleRegister = (userData) => {
    console.log('Usuario registrado:', userData);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route exact path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={<AuthChecker element={<Home />} />} />
          <Route path="/register" element={<AuthChecker element={<Register />} />} />
          <Route path="/job-form" element={<AuthChecker element={<JobForm />} />} />
          <Route path="/consultartrabajos" element={<AuthChecker element={<ConsultarTrabajos />} />} />
          <Route path="/Piezas" element={<AuthChecker element={<Piezas />} />} />
          <Route path="/detalles/:id" element={<AuthChecker element={<Detalles />} />} />
          <Route path="/seguimiento" element={<AuthChecker element={<Seguimiento />} />} />
          <Route path="/trabajos" element={<AuthChecker element={<Trabajos />} />} />
          <Route path="/ActualizarTrabajo" element={<AuthChecker element={<ActualizarTrabajo />} />} />
          <Route path="/ACTrabajos" element={<AuthChecker element={<ACTrabajos />} />} />
          {/* <Route path="/MecanicosCrud" element={<AuthChecker element={<MecanicosCrud />} />} /> */}
          <Route path="/MecanicosCrud" element={<AdminAuthChecker element={<MecanicosCrud />} />} />
          <Route path="/VerificarCorreo" element={<AuthChecker element={<VerificarCorreo />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
