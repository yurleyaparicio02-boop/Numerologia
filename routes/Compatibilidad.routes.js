import express from "express";

import {
    obtenerCompatibilidades,
    obtenerCompatibilidad,
    crearCompatibilidad,
    actualizarCompatibilidad,
    eliminarCompatibilidad
} from "../controllers/compatibilidad.controller.js";

const router = express.Router();

router.get("/", obtenerCompatibilidades);
router.get("/:id", obtenerCompatibilidad);
router.post("/", crearCompatibilidad);
router.put("/:id", actualizarCompatibilidad);
router.delete("/:id", eliminarCompatibilidad);

export default router;