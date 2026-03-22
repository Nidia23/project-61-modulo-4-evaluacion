//import
const mysql = require('mysql2/promise');

// CONEXIÓN A LA BASE DE DATOS
async function getConnection() {
const connection = await mysql.createConnection({
    host: 'localhost',
    database: 'autores-y-libros', //nombre del fichero que se relaciona
    user: 'root',
    password: '1234',
    });

    await connection.connect();

    console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
);

    return connection;
}

module.exports = {
    getConnection
}