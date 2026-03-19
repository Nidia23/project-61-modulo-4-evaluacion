//IMPORTS 
const express = require("express");
const cors = require("cors");
const {getConnection} = require ("./conection-db/conection-with-db.js")

// EXPRESS
const app = express();

// SERVIDOR
app.listen(3000, () => console.info("API INICIADA"));

// CORS +JSON DATA
app.use(cors());
app.use(express.json());

// START arrancamos la app para ver si funciona
app.get("/", function(req, res) {
    res.send("BIENVENIDA A MI NUEVA API!")
})