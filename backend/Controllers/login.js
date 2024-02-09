const express = require("express");

const connection = require("../database");

const login = (req, res) => {
    const { nombre_usuario, contrasena } = req.body;
    console.log(nombre_usuario + " " + contrasena)
  
    const query = "SELECT * FROM mecanico WHERE usuario = ? AND contrasena = ?";
  
    connection.query(query, [nombre_usuario, contrasena], (error, results) => {
      console.log(results[0])
      
      if (error) {
        console.error('Error en el inicio de sesión', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        if (results.length === 0) {
          return res.status(500).json({ message: 'Usuario o contraseñas incorrectas' });
        } else {
          return res.json({
            message: 'Inicio de sesión exitoso',
            usuario: {
              id_usuario: results[0].id_mecanico,
              nombre_usuario: results[0].nombre,
              rol_id: results[0].rol,
            },
          });
        }
      }
    });
  };
  

module.exports = {
  login
};