import mongoose from "mongoose";

const perfilNumerologicoSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    numeroVida: {
        type: Number,
        required: true
    },

    numeroExpresion: {
        type: Number,
        required: true
    },

    numeroAlma: {
        type: Number,
        required: true
    }
});

const PerfilNumerologico = mongoose.model(
    "PerfilNumerologico",
    perfilNumerologicoSchema
);

export default PerfilNumerologico;