const { getConnection } = require("../conection-db/connection-with-db.js");

// Función para MOSTRAR (Renderizar la vista EJS)
async function getProducts(req, res) {
    let connection;
    try {
        connection = await getConnection();
        const [results] = await connection.query("SELECT * FROM Productos");
        // En lugar de res.json, usamos res.render para enviar los datos a la página
        res.render("products", { listaProductos: results }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener productos");
    } finally {
        if (connection) await connection.end();
    }
}

// Función para GUARDAR (Procesar el formulario)
async function saveProduct(req, res) {
    const { nombre, precio, description, stock } = req.body;
    let connection;
    try {
        connection = await getConnection();
        const sql = "INSERT INTO Productos (nombre, precio, description, stock) VALUES (?, ?, ?, ?)";
        await connection.query(sql, [nombre, precio, description, stock]);
        
        // Tras guardar, volvemos a la página principal
        res.redirect("/"); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al guardar el producto");
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = { 
    saveProduct,
    getProducts
};