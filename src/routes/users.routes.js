const { Router } = require("express");
const {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} = require("../controllers/users.controllers");

const { validarJWT } = require("../middlewares/jwt.middleware");

const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuario);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", validarJWT, eliminarUsuario);

module.exports = router;