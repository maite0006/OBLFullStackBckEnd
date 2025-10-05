const Joi = require("joi");

const reviewSchemaVlidations = Joi.object({
  comentario: Joi.string().min(3).max(100).required(),
  etiquetaId: Joi.required(),
  multimediaId: Joi.required() 
});

module.exports = reviewSchemaVlidations;
