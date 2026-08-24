import Compatibilidad from "../models/Compatibilidad.model.js";

export const obtenerCompatibilidades = async (req, res) => {
    try {
        const compatibilidades = await Compatibilidad.find()
            .populate("usuario1_id")
            .populate("usuario2_id");

        res.json(compatibilidades);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las compatibilidades",
            error: error.message
        });
    }
};

export const obtenerCompatibilidad = async (req, res) => {
    try {
        const compatibilidad = await Compatibilidad.findById(req.params.id)
            .populate("usuario1_id")
            .populate("usuario2_id");

        if (!compatibilidad) {
            return res.status(404).json({
                mensaje: "Compatibilidad no encontrada"
            });
        }

        res.json(compatibilidad);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la compatibilidad",
            error: error.message
        });
    }
};

export const crearCompatibilidad = async (req, res) => {
    try {
        const compatibilidad = new Compatibilidad({
            usuario1_id: req.body.usuario1_id,
            usuario2_id: req.body.usuario2_id,
            puntaje: req.body.puntaje,
            interpretacionIA: req.body.interpretacionIA
        });

        await compatibilidad.save();

        res.status(201).json(compatibilidad);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear la compatibilidad",
            error: error.message
        });
    }
};

export const actualizarCompatibilidad = async (req, res) => {
    try {
        const datosActualizados = {
            usuario1_id: req.body.usuario1_id,
            usuario2_id: req.body.usuario2_id,
            puntaje: req.body.puntaje,
            interpretacionIA: req.body.interpretacionIA
        };

        const compatibilidad = await Compatibilidad.findByIdAndUpdate(
            req.params.id,
            datosActualizados,
            { new: true }
        );

        if (!compatibilidad) {
            return res.status(404).json({
                mensaje: "Compatibilidad no encontrada"
            });
        }

        res.json(compatibilidad);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar la compatibilidad",
            error: error.message
        });
    }
};

export const eliminarCompatibilidad = async (req, res) => {
    try {
        const compatibilidad = await Compatibilidad.findByIdAndDelete(
            req.params.id
        );

        if (!compatibilidad) {
            return res.status(404).json({
                mensaje: "Compatibilidad no encontrada"
            });
        }

        res.json({
            mensaje: "Compatibilidad eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la compatibilidad",
            error: error.message
        });
    }
};