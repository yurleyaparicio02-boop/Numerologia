import express from "express";

import {
    obtenerPerfiles,
    obtenerPerfil,
    crearPerfil,
    actualizarPerfil,
    eliminarPerfil
} from "../controllers/perfilNumerologico.controller.js";

import {
    crearPerfilNumerologicoValidator,
    actualizarPerfilNumerologicoValidator,
    idValidator
} from "../validators/perfilNumerologico.validator.js";

import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

// LISTAR
router.get("/", obtenerPerfiles);

// OBTENER POR ID
router.get(
    "/:id",
    idValidator,
    validarCampos,
    obtenerPerfil
);

// CREAR
router.post(
    "/",
    crearPerfilNumerologicoValidator,
    validarCampos,
    crearPerfil
);

// ACTUALIZAR
router.put(
    "/:id",
    [...idValidator, ...actualizarPerfilNumerologicoValidator],
    validarCampos,
    actualizarPerfil
);

// ELIMINAR
router.delete(
    "/:id",
    idValidator,
    validarCampos,
    eliminarPerfil
);

export default router;