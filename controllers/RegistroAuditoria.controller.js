import RegistroAuditoria from "../models/RegistroAuditoria.model.js";

export const obtenerRegistrosAuditoria = async (req, res) => {
    try {
        const registros = await RegistroAuditoria.find()
            .populate("usuario_id");

        res.json(registros);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los registros de auditoría",
            error: error.message
        });
    }
};

export const obtenerRegistroAuditoria = async (req, res) => {
    try {
        const registro = await RegistroAuditoria.findById(req.params.id)
            .populate("usuario_id");

        if (!registro) {
            return res.status(404).json({
                mensaje: "Registro de auditoría no encontrado"
            });
        }

        res.json(registro);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el registro de auditoría",
            error: error.message
        });
    }
};

export const crearRegistroAuditoria = async (req, res) => {
    try {
        const registro = new RegistroAuditoria({
            endpoint: req.body.endpoint,
            metodo: req.body.metodo,
            statusCode: req.body.statusCode,
            usuario_id: req.body.usuario_id
        });

        await registro.save();

        res.status(201).json(registro);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear el registro de auditoría",
            error: error.message
        });
    }
};

export const actualizarRegistroAuditoria = async (req, res) => {
    try {
        const datosActualizados = {
            endpoint: req.body.endpoint,
            metodo: req.body.metodo,
            statusCode: req.body.statusCode,
            usuario_id: req.body.usuario_id
        };

        const registro = await RegistroAuditoria.findByIdAndUpdate(
            req.params.id,
            datosActualizados,
            { new: true }
        );

        if (!registro) {
            return res.status(404).json({
                mensaje: "Registro de auditoría no encontrado"
            });
        }

        res.json(registro);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el registro de auditoría",
            error: error.message
        });
    }
};

export const eliminarRegistroAuditoria = async (req, res) => {
    try {
        const registro = await RegistroAuditoria.findByIdAndDelete(
            req.params.id
        );

        if (!registro) {
            return res.status(404).json({
                mensaje: "Registro de auditoría no encontrado"
            });
        }

        res.json({
            mensaje: "Registro de auditoría eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el registro de auditoría",
            error: error.message
        });
    }
};