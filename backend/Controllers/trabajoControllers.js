const connection = require("../database");

/// Obtener todos los trabajos
const obtenerTrabajos = (req, res) => {
  const sql = `
    SELECT t.*, m.nombre AS nombre_mecanico, c.nombre AS nombre_cliente
    FROM trabajo t
    INNER JOIN mecanico m ON t.id_mecanico = m.id_mecanico
    INNER JOIN cliente c ON t.id_cliente = c.id_cliente
  `;

  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener trabajos" });
    } else {
      res.json(results);
    }
  });
};

// Obtener información de un trabajo por ID
const obtenerTrabajoPorId = (req, res) => {
  const id = req.params.id_trabajo;

  const sql = `
    SELECT t.*, m.nombre AS nombre_mecanico, c.nombre AS nombre_cliente
    FROM trabajo t
    INNER JOIN mecanico m ON t.id_mecanico = m.id_mecanico
    INNER JOIN cliente c ON t.id_cliente = c.id_cliente
    WHERE t.id_trabajo = ?
  `;

  connection.query(sql, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener trabajo por ID" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "El trabajo no fue encontrado por ID" });
    } else {
      res.json(results[0]);
    }
  });
};

// Crear un nuevo trabajo
const crearTrabajo = (req, res) => {
  const { nombre, tipo_de_trabajo, horas, costo, costoPiezas, estado, descripcion, id_mecanico, id_cliente } = req.body;

  const sql = "INSERT INTO trabajo (nombre, tipo_de_trabajo, horas, costo, costoPiezas, estado, descripcion, id_mecanico, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(sql, [nombre, tipo_de_trabajo, horas, costo, costoPiezas, estado, descripcion, id_mecanico, id_cliente], (error, results) => {
    if (error) {
      res.status(500).json({ error: `Error al agregar nuevo trabajo: ${error.message}` });
    } else {
      res.json({ message: "Trabajo agregado correctamente" });
    }
  });
};

// Actualizar información de un trabajo por ID
const actualizarTrabajoPorId = (req, res) => {
  const id = req.params.id_trabajo;
  const { nombre, tipo_de_trabajo, horas, costo, costoPiezas, estado, descripcion, id_mecanico, id_cliente } = req.body;

  const sql = "UPDATE trabajo SET nombre = ?, tipo_de_trabajo = ?, horas = ?, costo = ?, costoPiezas = ?, estado = ?, descripcion = ?, id_mecanico = ?, id_cliente = ? WHERE id_trabajo = ?";

  connection.query(sql, [nombre, tipo_de_trabajo, horas, costo, costoPiezas, estado, descripcion, id_mecanico, id_cliente, id], (error, results) => {
    if (error) {
      res.status(500).json({ error: `Error al actualizar trabajo por ID: ${error.message}` });
    } else {
      res.json({ message: "Trabajo actualizado correctamente" });
    }
  });
};


// Eliminar un trabajo por ID
const eliminarTrabajoPorId = (req, res) => {
  const id = req.params.id_trabajo;

  const sql = "DELETE FROM trabajo WHERE id_trabajo = ?";

  connection.query(sql, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: `Error al eliminar trabajo por ID: ${error.message}` });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "El trabajo no fue encontrado por ID" });
    } else {
      res.json({ message: "Trabajo eliminado correctamente" });
    }
  });
};


module.exports = {
  obtenerTrabajos,
  obtenerTrabajoPorId,
  crearTrabajo,
  actualizarTrabajoPorId,
  eliminarTrabajoPorId,
};
