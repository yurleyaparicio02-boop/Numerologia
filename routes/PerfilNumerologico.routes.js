import express from "express";

import {
    obtenerPerfiles,
    obtenerPerfil,
    crearPerfil,
    actualizarPerfil,
    eliminarPerfil
} from "../controllers/perfilNumerologico.controller.js";

const router = express.Router();

router.get("/", obtenerPerfiles);
router.get("/:id", obtenerPerfil);
router.post("/", crearPerfil);
router.put("/:id", actualizarPerfil);
router.delete("/:id", eliminarPerfil);

export default router;