import mongoose from "mongoose";

const lecturaSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    prompt: {
        type: String,
        required: true
    },

    respuesta: {
        type: String,
        required: true
    },

    tipoLectura: {
        type: String,
        enum: ["diaria", "general", "anual"],
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now
    }
});

const Lectura = mongoose.model("Lectura", lecturaSchema);

export default Lectura;