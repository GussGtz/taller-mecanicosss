const connection = require("../database");

const login = (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM mecanicos WHERE email = ? AND password = ?";
    connection.query(sql, [email, password], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error en el servidor" });
        } else if (results.length === 0) {
            res.status(401).json({ error: "Credenciales inválidas" });
        } else {
            // Aquí puedes generar un token JWT y enviarlo como respuesta si las credenciales son válidas
            res.json({ message: "Inicio de sesión exitoso" });
        }
    });
};

module.exports = { login };
