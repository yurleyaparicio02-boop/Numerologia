import express from "express";

import {
    obtenerRegistrosAuditoria,
    obtenerRegistroAuditoria,
    crearRegistroAuditoria,
    actualizarRegistroAuditoria,
    eliminarRegistroAuditoria
} from "../controllers/RegistroAuditoria.controller.js";

import {
    crearRegistroAuditoriaValidator,
    actualizarRegistroAuditoriaValidator,
    idValidator
} from "../validators/registroauditoria.validator.js";

import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

// LISTAR
router.get("/", obtenerRegistrosAuditoria);

// OBTENER POR ID
router.get(
    "/:id",
    idValidator,
    validarCampos,
    obtenerRegistroAuditoria
);

// CREAR
router.post(
    "/",
    crearRegistroAuditoriaValidator,
    validarCampos,
    crearRegistroAuditoria
);

// ACTUALIZAR
router.put(
    "/:id",
    [...idValidator, ...actualizarRegistroAuditoriaValidator],
    validarCampos,
    actualizarRegistroAuditoria
);

// ELIMINAR
router.delete(
    "/:id",
    idValidator,
    validarCampos,
    eliminarRegistroAuditoria
);

export default router;