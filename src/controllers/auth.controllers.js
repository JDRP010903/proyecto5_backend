const User = require("../models/user");
const bcrypt = require("bcrypt");

const { generarJWT } = require("../helpers/jwt.helper");

const registrarUsuario = async (req, res) => {
    try {
        const { username, name, lastname, password, email, age, image } = req.body;

        // Verificar si el usuario ya existe
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({
                ok: false,
                msg: "Este usuario ya está registrado",
            });
        }

        // Crear la sal y hashear la contraseña
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Crear el objeto usuario con la contraseña hasheada
        const newUser = new User({
            username,
            name,
            lastname,
            password: hashedPassword,
            email,
            age,
            image: image || "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg", // Imagen por defecto si no se proporciona
        });

        // Guardar el usuario en la base de datos
        const usuarioRegistrado = await newUser.save();

        // Generar el JWT
        const token = await generarJWT(usuarioRegistrado.id);

        // Enviar respuesta exitosa
        return res.json({
            ok: true,
            msg: "Usuario registrado exitosamente",
            data: usuarioRegistrado,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
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