import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.model.js";

// GENERAR JWT
export const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

// VALIDAR JWT
export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            mensaje: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Token no válido"
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: "Token no válido"
        });
    }
};