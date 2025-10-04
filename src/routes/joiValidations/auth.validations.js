const Joi = require("joi");

const signupSchemaValidations = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).max(20).alphanum().required(),
  email: Joi.string().min(5).max(30).email().required(),
});

const loginSchemaValidations = Joi.object({
  email: Joi.string().min(5).max(30).email().required(),
  password: Joi.string().min(8).max(20).alphanum().required(),
});


module.exports = {
    signupSchemaValidations,
    loginSchemaValidations
};