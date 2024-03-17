const User = require("../models/user");
const bcrypt = require("bcrypt");

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();

        return res.json({
        msg: "Usuarios obtenidos",
        data: usuarios,
        });
    } catch (error) {
        return res.status(500).json({
        msg: "Error en el servidor",
        });
    }
    };

    const obtenerUsuario = async (req, res) => {
    const { id } = req.params;

    const usuarioObtenido = await User.findById(id);

    return res.json({
        msg: "Usuario obtenido",
        data: usuarioObtenido,
    });
    };

    const crearUsuario = async (req, res) => {
    // const { username, password, activo } = req.body;

    const salt = bcrypt.genSaltSync(10);

    const usuario = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, salt),
    };

    const usuario_creado = await User(usuario).save();

    return res.json({
        msg: "Usuario creado",
        data: usuario_creado,
    });
    };

    const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    // const { password } = req.body;

    const usuario = {
        ...req.body,
    };

    const usuario_actualizado = await User.findByIdAndUpdate(id, usuario, {
        new: true,
    });

    return res.json({
        msg: "Usuario actualizado",
        data: usuario_actualizado,
    });
    };

    const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    const usuario_eliminado = await User.findByIdAndDelete(id);

    return res.json({
        msg: "Usuario eliminado",
        data: usuario_eliminado,
    });
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
};