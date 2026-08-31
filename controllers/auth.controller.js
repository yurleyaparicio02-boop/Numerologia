import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.model.js";
import { generarJWT } from "../middlewares/validar-jwt.js";

export const registrarUsuario = async (req, res) => {
    try {
        const {
            nombreCompleto,
            email,
            password,
            fechaNacimiento
        } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const usuario = new Usuario({
            nombreCompleto,
            email,
            passwordHash,
            fechaNacimiento
        });

        await usuario.save();

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: usuario._id,
                nombreCompleto: usuario.nombreCompleto,
                email: usuario.email,
                fechaNacimiento: usuario.fechaNacimiento
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al registrar el usuario",
            error: error.message
        });
    }
};


export const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.passwordHash
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const token = await generarJWT(usuario._id);

        res.json({
            mensaje: "Inicio de sesión exitoso",
            token
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al iniciar sesión",
            error: error.message
        });
    }
};