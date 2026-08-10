import express from "express";

import {
    obtenerLecturas,
    obtenerLectura,
    crearLectura,
    actualizarLectura,
    eliminarLectura
} from "../controllers/lectura.controller.js";

const router = express.Router();

router.get("/", obtenerLecturas);
router.get("/:id", obtenerLectura);
router.post("/", crearLectura);
router.put("/:id", actualizarLectura);
router.delete("/:id", eliminarLectura);

export default router;