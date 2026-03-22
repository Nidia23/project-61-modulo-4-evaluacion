//IMPORTS 
const express = require("express");
const cors = require("cors");
const {getConnection} = require ("./src/conection-db/connection-with-db.js")
const path = require("path"); // Útil para las rutas de carpetas

//CONTROLLER
const { saveProduct, getProducts } = require("./src/controller/product.js")
const { addToCart, getCart, clearCart } = require("./src/controller/carrito.js");

// EXPRESS
const app = express();

// CONFIGURACIÓN EJS 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views")); // Apunta a tu carpeta src/views

// SERVIDOR
app.listen(3000, () => console.info("API INICIADA"));

// MIDDLEWARES
app.use(cors());
app.use(express.json());
// ¡ESTA LÍNEA ES VITAL PARA TU FORMULARIO!
app.use(express.urlencoded({ extended: false }));

// Carpeta para archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, "public")));

//PRODUCTOS
app.get("/", getProducts);
app.post("/productos/nuevo", saveProduct)

//PRODUCTO NUEVO
app.get("/nuevo", (req, res) => {
    res.render("nuevoproducto");
});

//CARRITO
app.get("/carrito", getCart);
app.post("/carrito/add", addToCart);
app.post("/carrito/vaciar", clearCart);

