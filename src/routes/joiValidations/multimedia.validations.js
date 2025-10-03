const Joi = require("joi");
const multimediaSchemaValidations = Joi.object({
  titulo: Joi.string().trim().min(2).max(100).required()
    .messages({
        "string.empty": "El título no puede estar vacío",
        "string.min": "El título debe tener al menos 2 caracteres",
        "string.max": "El título no puede superar 100 caracteres",
        "any.required": "El título es obligatorio"
      }),
      tipo: Joi.string().valid("pelicula", "serie", "corto").required()
      .messages({
        "any.only": "El tipo debe ser 'pelicula', 'serie' o 'corto'",
        "any.required": "El tipo es obligatorio"
      }),
    descripcion: Joi.string().trim().max(500).allow("")
      .messages({
        "string.max": "La descripción no puede superar 500 caracteres"
      }),
    duracion: Joi.number().integer().min(1).max(600)
      .when("tipo", { is: Joi.valid("pelicula", "corto"), then: Joi.required(), otherwise: Joi.forbidden() })
      .messages({
        "number.base": "La duración debe ser un número",
        "number.min": "La duración debe ser al menos 1 minuto",
        "number.max": "La duración no puede superar 600 minutos",
        "any.required": "La duración es obligatoria para películas y cortos",
        "any.unknown": "La duración no debe estar definida para series"
      }),
    temporadas: Joi.number().integer().min(1)
      .when("tipo", { is: "serie", then: Joi.required(), otherwise: Joi.forbidden() })
      .messages({
        "number.base": "Las temporadas deben ser un número entero",
        "number.min": "Debe haber al menos 1 temporada",
        "any.required": "Las temporadas son obligatorias para series",
        "any.unknown": "Las temporadas solo aplican a series"
      }),
    etiquetas: Joi.array()
      .items(Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId validation"))
      .messages({
        "any.invalid": "Cada etiqueta debe ser un ID válido"
      })
      .default([])
  });




module.exports = multimediaSchemaValidations;