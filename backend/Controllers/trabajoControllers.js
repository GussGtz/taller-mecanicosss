const connection = require("../database");

// Obtener todos los trabajos
const obtenerTrabajos = (req, res) => {
  const sql = `
    SELECT t.*, m.nombre AS nombre_mecanico, c.nombre AS nombre_cliente, p.nombre AS nombre_pieza
    FROM trabajo t
    INNER JOIN mecanico m ON t.id_mecanico = m.id_mecanico
    INNER JOIN cliente c ON t.id_cliente = c.id_cliente
    LEFT JOIN trabajo_pieza tp ON t.id_trabajo = tp.id_trabajo
    LEFT JOIN pieza p ON tp.id_pieza = p.id_pieza
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
    SELECT t.*, m.nombre AS nombre_mecanico, c.nombre AS nombre_cliente, p.nombre AS nombre_pieza
    FROM trabajo t
    INNER JOIN mecanico m ON t.id_mecanico = m.id_mecanico
    INNER JOIN cliente c ON t.id_cliente = c.id_cliente
    LEFT JOIN trabajo_pieza tp ON t.id_trabajo = tp.id_trabajo
    LEFT JOIN pieza p ON tp.id_pieza = p.id_pieza
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
  const { id_mecanico, id_cliente, fecha, descripcion } = req.body;

  const sql = "INSERT INTO trabajo (id_mecanico, id_cliente, fecha, descripcion) VALUES (?, ?, ?, ?)";

  connection.query(sql, [id_mecanico, id_cliente, fecha, descripcion], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al agregar nuevo trabajo" });
    } else {
      res.json({ message: "Trabajo agregado correctamente" });
    }
  });
};

// Actualizar información de un trabajo por ID
const actualizarTrabajoPorId = (req, res) => {
  const id = req.params.id_trabajo;
  const { id_mecanico, id_cliente, fecha, descripcion } = req.body;

  const sql = "UPDATE trabajo SET id_mecanico = ?, id_cliente = ?, fecha = ?, descripcion = ? WHERE id_trabajo = ?";

  connection.query(sql, [id_mecanico, id_cliente, fecha, descripcion, id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al actualizar trabajo por ID" });
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
      res.status(500).json({ error: "Error al eliminar trabajo por ID" });
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
