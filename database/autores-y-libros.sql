CREATE TABLE `Productos` (
  `idProductos` INT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `description` TEXT NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`idProductos`));

CREATE TABLE `Carrito` (
  `idCarrito` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT NOT NULL,
  `Productos_idProductos` INT NOT NULL,
  PRIMARY KEY (`idCarrito`),
  CONSTRAINT `fk_Carrito_Productos`
    FOREIGN KEY (`Productos_idProductos`)
    REFERENCES `Productos` (`idProductos`) 
);