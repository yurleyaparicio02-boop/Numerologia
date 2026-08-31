import { body, param } from "express-validator";

// Reglas para CREAR una compatibilidad
export const crearCompatibilidadValidator = [

    body("usuario1_id")
        .notEmpty()
        .withMessage("El usuario1_id es obligatorio")
        .isMongoId()
        .withMessage("El usuario1_id no es un ObjectId válido"),

    body("usuario2_id")
        .notEmpty()
        .withMessage("El usuario2_id es obligatorio")
        .isMongoId()
        .withMessage("El usuario2_id no es un ObjectId válido"),

    body("puntaje")
        .notEmpty()
        .withMessage("El puntaje es obligatorio")
        .isFloat()
        .withMessage("El puntaje debe ser un número"),

    body("interpretacionIA")
        .trim()
        .notEmpty()
        .withMessage("La interpretación de IA es obligatoria"),
];


// Reglas para ACTUALIZAR una compatibilidad
export const actualizarCompatibilidadValidator = [

    body("usuario1_id")
        .optional()
        .isMongoId()
        .withMessage("El usuario1_id no es un ObjectId válido"),

    body("usuario2_id")
        .optional()
        .isMongoId()
        .withMessage("El usuario2_id no es un ObjectId válido"),

    body("puntaje")
        .optional()
        .isFloat()
        .withMessage("El puntaje debe ser un número"),

    body("interpretacionIA")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La interpretación de IA no puede estar vacía"),
];


// Regla para validar el :id
export const idValidator = [
    param("id")
        .isMongoId()
        .withMessage(
            "El id proporcionado no es un ObjectId válido de MongoDB"
        ),
];