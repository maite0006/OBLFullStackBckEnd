const Joi = require("joi");


  const etiquetaSchemaValidations = Joi.object({
    nombre: Joi.string().trim().min(2).max(50).required()
      .messages({//Mensajes para propagacion de errores. preguntar si es correcto el manejo
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "string.max": "El nombre no puede superar 50 caracteres",
        "any.required": "El nombre es obligatorio"
      }),
    descripcion: Joi.string().trim().max(255).allow("")
      .messages({
        "string.max": "La descripción no puede superar 255 caracteres"
      }),
    abortEarly: false
  });

    


module.exports = etiquetaSchemaValidations;
