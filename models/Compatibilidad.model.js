import mongoose from "mongoose";

const compatibilidadSchema = new mongoose.Schema({
    usuario1_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    usuario2_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    puntaje: {
        type: Number,
        required: true
    },

    interpretacionIA: {
        type: String,
        required: true
    }
});

const Compatibilidad = mongoose.model(
    "Compatibilidad",
    compatibilidadSchema
);

export default Compatibilidad;