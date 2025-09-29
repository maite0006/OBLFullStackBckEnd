const express = require("express");
const authRouter = express.Router();
const { postAuthLogin, postAuthSignup } = require("../controllers/auth.controller")
const payloadMiddleWare = require("../middlewares/payload.middleware");
const { signupSchema, loginSchema } = require("./joiValidations/auth.validations");


authRouter.post("/signup", payloadMiddleWare(signupSchema) ,postAuthSignup);//payload con verificaciones shcemaUser(joi) => controller con funciones de repo=> repo conoce al modelo =>el modelo conoce al schema de usuario; 
authRouter.post("/login", payloadMiddleWare(loginSchema), postAuthLogin);


module.exports = authRouter;