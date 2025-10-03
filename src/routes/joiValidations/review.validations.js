const Joi = require("joi");

const reviewSchemaVlidations = Joi.object({
  comentario: Joi.string().min(3).max(100).required(),
  //TODO: pner etiquetaId y multimediaId required
  /* etiqueta: Joi.required(),
  multimediaID: Joi.required() */
});

module.exports = reviewSchemaVlidations;
