import { body, param } from "express-validator";

// Reglas para CREAR un registro de auditoría
export const crearRegistroAuditoriaValidator = [

    body("endpoint")
        .trim()
        .notEmpty()
        .withMessage("El endpoint es obligatorio"),

    body("metodo")
        .trim()
        .notEmpty()
        .withMessage("El método es obligatorio"),

    body("statusCode")
        .notEmpty()
        .withMessage("El statusCode es obligatorio")
        .isInt()
        .withMessage("El statusCode debe ser un número entero"),

    body("usuario_id")
        .optional()
        .isMongoId()
        .withMessage("El usuario_id no es un ObjectId válido"),
];


// Reglas para ACTUALIZAR un registro de auditoría
export const actualizarRegistroAuditoriaValidator = [

    body("endpoint")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El endpoint no puede estar vacío"),

    body("metodo")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El método no puede estar vacío"),

    body("statusCode")
        .optional()
        .isInt()
        .withMessage("El statusCode debe ser un número entero"),

    body("usuario_id")
        .optional()
        .isMongoId()
        .withMessage("El usuario_id no es un ObjectId válido"),
];


// Regla para validar el :id
export const idValidator = [
    param("id")
        .isMongoId()
        .withMessage(
            "El id proporcionado no es un ObjectId válido de MongoDB"
        ),
];