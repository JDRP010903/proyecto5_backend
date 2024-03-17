const Product = require("../models/product");

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Product.find();

        return res.json({
        ok: true,
        msg: "Lista de productos obtenida",
        data: productos,
        });
    } catch (error) {
        return res.status(500).json({
        ok: false,
        msg: "Error en el servidor",
        data: [],
        });
    }
};

const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Product.findById(id);

        return res.json({
        ok: true,
        msg: "Producto obtenido",
        data: producto,
        });
    } catch (error) {
        return res.status(500).json({
        ok: false,
        msg: "Error en el servidor",
        data: {},
        });
    }
};

module.exports = { obtenerProductos, obtenerProducto };