import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    fechaNacimiento: {
        type: Date,
        required: true
    },

    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;