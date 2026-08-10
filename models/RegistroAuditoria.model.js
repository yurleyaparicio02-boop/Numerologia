import mongoose from "mongoose";

const registroAuditoriaSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true
    },

    metodo: {
        type: String,
        required: true
    },

    statusCode: {
        type: Number,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    },

    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }
});

const RegistroAuditoria = mongoose.model(
    "RegistroAuditoria",
    registroAuditoriaSchema
);

export default RegistroAuditoria;