const { getConnection } = require("../conection-db/connection-with-db.js");

// 1. FUNCIÓN PARA AÑADIR (POST)
async function addToCart(req, res) {
    const { producto_id, cantidad } = req.body; 
    let connection;
    try {
        connection = await getConnection();
        // Ojo: Asegúrate de que los nombres de columnas coincidan con tu DB de MySQL Workbench
        const sql = "INSERT INTO Carrito (cantidad, Productos_idProductos) VALUES (?, ?)";
        await connection.query(sql, [cantidad, producto_id]);
        
        // Tras guardar, mandamos al usuario a ver su carrito
        res.redirect("/carrito"); 
    } catch (error) {
        console.error("Error al añadir al carrito:", error);
        res.status(500).send("Error interno del servidor");
    } finally {
        if (connection) await connection.end();
    }
}

// 2. FUNCIÓN PARA MOSTRAR EL CARRITO (GET)
async function getCart(req, res) {
    let connection;
    try {
        connection = await getConnection();
        // Hacemos un JOIN para traer el nombre y precio del producto
        const sql = 
        `SELECT c.idCarrito, c.cantidad, p.nombre, p.precio, (c.cantidad * p.precio) AS subtotal
        FROM Carrito c JOIN Productos p ON c.Productos_idProductos = p.idProductos`;

        const [results] = await connection.query(sql);

        // Calculamos el total sumando todos los subtotales del array
        const totalCarrito = results.reduce((acc, item) => acc + item.subtotal, 0);

        // Renderizamos la vista 'carrito.ejs' pasando los datos
        res.render("carrito", { 
            items: results, 
            total: totalCarrito 
        }); 
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).send("Error al cargar el carrito");
    } finally {
        if (connection) await connection.end();
    }
}

//DELETE
async function clearCart(req, res) {
    let connection;
    try {
        connection = await getConnection();
        // Borra todos los registros de la tabla Carrito
        await connection.query("DELETE FROM Carrito"); 
        
        res.redirect("/carrito");
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        res.status(500).send("No se pudo vaciar el carrito");
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    addToCart,
    getCart,
    clearCart // <-- Nueva
};

