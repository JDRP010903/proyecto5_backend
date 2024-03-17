const { Router } = require("express");

const {
    obtenerProductos,
    obtenerProducto,
} = require("../controllers/products.controllers");

const router = Router();

router.get("/", obtenerProductos);
router.get("/:id", obtenerProducto);

module.exports = router;