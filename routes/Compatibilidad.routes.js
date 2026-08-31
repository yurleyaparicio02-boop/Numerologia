import express from "express";

import {
    obtenerCompatibilidades,
    obtenerCompatibilidad,
    crearCompatibilidad,
    actualizarCompatibilidad,
    eliminarCompatibilidad
} from "../controllers/compatibilidad.controller.js";

import {
    crearCompatibilidadValidator,
    actualizarCompatibilidadValidator,
    idValidator
} from "../validators/compatibilidad.validator.js";

import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

// LISTAR
router.get("/", obtenerCompatibilidades);

// OBTENER POR ID
router.get(
    "/:id",
    idValidator,
    validarCampos,
    obtenerCompatibilidad
);

// CREAR
router.post(
    "/",
    crearCompatibilidadValidator,
    validarCampos,
    crearCompatibilidad
);

// ACTUALIZAR
router.put(
    "/:id",
    [...idValidator, ...actualizarCompatibilidadValidator],
    validarCampos,
    actualizarCompatibilidad
);

// ELIMINAR
router.delete(
    "/:id",
    idValidator,
    validarCampos,
    eliminarCompatibilidad
);

export default router;