// config/database.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'taller',
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar la base de datos', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;
