import Lectura from "../models/Lectura.model.js";

export const obtenerLecturas = async (req, res) => {
    try {
        const lecturas = await Lectura.find()
            .populate("usuario_id");

        res.json(lecturas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las lecturas",
            error: error.message
        });
    }
};

export const obtenerLectura = async (req, res) => {
    try {
        const lectura = await Lectura.findById(req.params.id)
            .populate("usuario_id");

        if (!lectura) {
            return res.status(404).json({
                mensaje: "Lectura no encontrada"
            });
        }

        res.json(lectura);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la lectura",
            error: error.message
        });
    }
};

export const crearLectura = async (req, res) => {
    try {
        const lectura = new Lectura(req.body);
        await lectura.save();

        res.status(201).json(lectura);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear la lectura",
            error: error.message
        });
    }
};

export const actualizarLectura = async (req, res) => {
    try {
        const lectura = await Lectura.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!lectura) {
            return res.status(404).json({
                mensaje: "Lectura no encontrada"
            });
        }

        res.json(lectura);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar la lectura",
            error: error.message
        });
    }
};

export const eliminarLectura = async (req, res) => {
    try {
        const lectura = await Lectura.findByIdAndDelete(
            req.params.id
        );

        if (!lectura) {
            return res.status(404).json({
                mensaje: "Lectura no encontrada"
            });
        }

        res.json({
            mensaje: "Lectura eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la lectura",
            error: error.message
        });
    }
};