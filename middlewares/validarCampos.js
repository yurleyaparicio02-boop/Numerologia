import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {

    console.log("🔥 ENTRÓ A validarCampos");

    const errores = validationResult(req);

    console.log("🔥 ERRORES:", errores.array());

    if (!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: "Error de validación",
            errores: errores.array().map((err) => ({
                campo: err.path,
                mensaje: err.msg,
            })),
        });
    }

    next();
};