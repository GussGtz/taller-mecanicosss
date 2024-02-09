// Importar Express y otros módulos necesarios
const express = require("express");
const cors = require("cors");
const trabajoRouter = require("./Router/trabajoRouter");
const piezasRouter = require("./Router/piezaRouter");
const mecanicosRouter = require("./Router/mecanicosRouter");
const loginRouter = require("./Router/loginRouter");
const passport = require('passport'); // Importa Passport para la autenticación

// Definir middlewares de autenticación y autorización
const verificarAutenticacion = (req, res, next) => {
  // Lógica para verificar la autenticación
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "Usuario no autenticado" });
  }
};

const verificarRolAdministrador = (req, res, next) => {
  // Lógica para verificar el rol del usuario
  if (req.user && req.user.rol === 'administrador') {
    next();
  } else {
    res.status(403).json({ error: "Acceso prohibido. Rol de administrador requerido" });
  }
};

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// Inicializar Passport y utilizar el middleware de sesión si lo estás utilizando

app.use(passport.initialize()); // Inicializa Passport
app.use(passport.session()); // Usa el middleware de sesión si lo estás utilizando

app.use("/api/trabajos", verificarAutenticacion, trabajoRouter); // Aplica verificarAutenticacion a las rutas de trabajos
app.use("/api/piezas", verificarAutenticacion, piezasRouter); // Aplica verificarAutenticacion a las rutas de piezas
app.use("/api/mecanico", verificarAutenticacion, mecanicosRouter); // Aplica verificarAutenticacion a las rutas de mecanicos
app.use("/api", loginRouter); // Usa el enrutador de autenticación

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
