import PerfilNumerologico from "../models/PerfilNumerologico.model.js";

export const obtenerPerfiles = async (req, res) => {
    try {
        const perfiles = await PerfilNumerologico.find()
            .populate("usuario_id");

        res.json(perfiles);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los perfiles numerológicos",
            error: error.message
        });
    }
};

export const obtenerPerfil = async (req, res) => {
    try {
        const perfil = await PerfilNumerologico.findById(req.params.id)
            .populate("usuario_id");

        if (!perfil) {
            return res.status(404).json({
                mensaje: "Perfil numerológico no encontrado"
            });
        }

        res.json(perfil);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el perfil numerológico",
            error: error.message
        });
    }
};

export const crearPerfil = async (req, res) => {
    try {
        const perfil = new PerfilNumerologico(req.body);
        await perfil.save();

        res.status(201).json(perfil);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear el perfil numerológico",
            error: error.message
        });
    }
};

export const actualizarPerfil = async (req, res) => {
    try {
        const perfil = await PerfilNumerologico.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!perfil) {
            return res.status(404).json({
                mensaje: "Perfil numerológico no encontrado"
            });
        }

        res.json(perfil);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el perfil numerológico",
            error: error.message
        });
    }
};

export const eliminarPerfil = async (req, res) => {
    try {
        const perfil = await PerfilNumerologico.findByIdAndDelete(
            req.params.id
        );

        if (!perfil) {
            return res.status(404).json({
                mensaje: "Perfil numerológico no encontrado"
            });
        }

        res.json({
            mensaje: "Perfil numerológico eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el perfil numerológico",
            error: error.message
        });
    }
};