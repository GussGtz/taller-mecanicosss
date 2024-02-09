const connection = require("../database");

// Obtener todos los mecánicos
const obtenerMecanicos = (req, res) => {
  const sql = "SELECT * FROM mecanico";

  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener mecánicos" });
    } else {
      res.json(results);
    }
  });
};

// Obtener información de un mecánico por ID
const obtenerMecanicoPorId = (req, res) => {
  const id = req.params.id_mecanico;

  const sql = "SELECT * FROM mecanico WHERE id_mecanico = ?";

  connection.query(sql, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener mecánico por ID" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "El mecánico no fue encontrado por ID" });
    } else {
      res.json(results[0]);
    }
  });
};

// Crear un nuevo mecánico
const crearMecanico = (req, res) => {
  const { nombre, especialidad, usuario, contrasena, rol } = req.body;

  const sql = "INSERT INTO mecanico (nombre, especialidad, usuario, contrasena, rol) VALUES (?, ?, ?, ?, ?)";

  connection.query(sql, [nombre, especialidad, usuario, contrasena, rol], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al agregar nuevo mecánico" });
    } else {
      res.json({ message: "Mecánico agregado correctamente" });
    }
  });
};

// Actualizar información de un mecánico por ID
const actualizarMecanicoPorId = (req, res) => {
  const id = req.params.id_mecanico;
  const { nombre, especialidad, usuario, contrasena, rol } = req.body;

  const sql = "UPDATE mecanico SET nombre = ?, especialidad = ?, usuario = ?, contrasena = ?, rol = ? WHERE id_mecanico = ?";

  connection.query(sql, [nombre, especialidad, usuario, contrasena, rol, id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al actualizar mecánico por ID" });
    } else {
      res.json({ message: "Mecánico actualizado correctamente" });
    }
  });
};

// Eliminar un mecánico por ID
const eliminarMecanicoPorId = (req, res) => {
  const id = req.params.id_mecanico;

  const sql = "DELETE FROM mecanico WHERE id_mecanico = ?";

  connection.query(sql, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al eliminar mecánico por ID" });
    } else {
      res.json({ message: "Mecánico eliminado correctamente" });
    }
  });
};

module.exports = {
  obtenerMecanicos,
  obtenerMecanicoPorId,
  crearMecanico,
  actualizarMecanicoPorId,
  eliminarMecanicoPorId,
};