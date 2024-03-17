const User = require("../models/user");
const bcrypt = require("bcrypt");

const { generarJWT } = require("../helpers/jwt.helper");

const registrarUsuario = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (user) {
        return res.status(400).json({
            ok: false,
            msg: "Este usuario ya esta registrado",
            data: {},
        });
        }

        const salt = bcrypt.genSaltSync(10);

        const usuario = {
        username: username,
        password: bcrypt.hashSync(password, salt),
        };

        const usuario_registrado = await User(usuario).save();

        const token = await generarJWT(usuario_registrado.id);

        return res.json({
        ok: true,
        msg: "Usuario registrado",
        data: usuario_registrado,
        token: token,
        });
    } catch (error) {
        return res.status(500).json({
        ok: false,
        msg: "Error en el servidor",
        data: {},
        });
    }
    };

    const iniciarSesion = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (!user) {
        return res.status(400).json({
            ok: false,
            msg: "Usuario o contraseña incorrectos",
            data: {},
        });
        }

        const validPassord = bcrypt.compareSync(password, user.password);

        if (!validPassord) {
        return res.status(400).json({
            ok: false,
            msg: "Usuario o contraseña incorrectos",
            data: {},
        });
        }

        const token = await generarJWT(user.id);

        return res.json({
        ok: true,
        msg: "Acceso correcto",
        data: user,
        token: token,
        });
    } catch (error) {
        return res.status(500).json({
        ok: false,
        msg: "Error en el servidor",
        data: {},
        });
    }
    };

    const validarUsuario = async (req, res) => {
    const user = req.user;

    const token = await generarJWT(user.id);

    return res.json({
        ok: true,
        msg: "Usuario validado",
        data: user,
        token: token,
    });
};

module.exports = {
    registrarUsuario,
    iniciarSesion,
    validarUsuario,
};