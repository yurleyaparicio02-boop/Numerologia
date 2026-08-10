import express from "express";

import {
    obtenerRegistrosAuditoria,
    obtenerRegistroAuditoria,
    crearRegistroAuditoria,
    actualizarRegistroAuditoria,
    eliminarRegistroAuditoria
} from "../controllers/registroAuditoria.controller.js";

const router = express.Router();

router.get("/", obtenerRegistrosAuditoria);
router.get("/:id", obtenerRegistroAuditoria);
router.post("/", crearRegistroAuditoria);
router.put("/:id", actualizarRegistroAuditoria);
router.delete("/:id", eliminarRegistroAuditoria);

export default router;