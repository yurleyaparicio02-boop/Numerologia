import express from "express";
import {
    obtenerLecturas,
    obtenerLectura,
    crearLectura,
    actualizarLectura,
    eliminarLectura
} from "../controllers/lectura.controller.js";

import {
    crearLecturaValidator,
    actualizarLecturaValidator,
    idValidator
} from "../validators/lectura.validator.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = express.Router();

// LISTAR - LECTURA PRINCIPAL GRATUITA
router.get(
    "/",
    validarJWT,
    obtenerLecturas
);

// OBTENER POR ID
router.get(
    "/:id",
    validarJWT,
    idValidator,
    validarCampos,
    obtenerLectura
);

// CREAR
router.post(
    "/",
    crearLecturaValidator,
    validarCampos,
    crearLectura
);

// ACTUALIZAR
router.put(
    "/:id",
    [...idValidator, ...actualizarLecturaValidator],
    validarCampos,
    actualizarLectura
);

// ELIMINAR
router.delete(
    "/:id",
    idValidator,
    validarCampos,
    eliminarLectura
);

export default router;