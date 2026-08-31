import { body, param } from "express-validator";

export const crearPerfilNumerologicoValidator = [
    body("usuario_id")
        .notEmpty()
        .withMessage("El usuario_id es obligatorio")
        .isMongoId()
        .withMessage("El usuario_id no es un ObjectId válido"),

    body("numeroVida")
        .notEmpty()
        .withMessage("El número de vida es obligatorio")
        .isInt()
        .withMessage("El número de vida debe ser un número entero"),

    body("numeroExpresion")
        .notEmpty()
        .withMessage("El número de expresión es obligatorio")
        .isInt()
        .withMessage("El número de expresión debe ser un número entero"),

    body("numeroAlma")
        .notEmpty()
        .withMessage("El número de alma es obligatorio")
        .isInt()
        .withMessage("El número de alma debe ser un número entero"),
];

export const actualizarPerfilNumerologicoValidator = [
    body("usuario_id")
        .optional()
        .isMongoId()
        .withMessage("El usuario_id no es un ObjectId válido"),

    body("numeroVida")
        .optional()
        .isInt()
        .withMessage("El número de vida debe ser un número entero"),

    body("numeroExpresion")
        .optional()
        .isInt()
        .withMessage("El número de expresión debe ser un número entero"),

    body("numeroAlma")
        .optional()
        .isInt()
        .withMessage("El número de alma debe ser un número entero"),
];

export const idValidator = [
    param("id")
        .isMongoId()
        .withMessage(
            "El id proporcionado no es un ObjectId válido de MongoDB"
        ),
];