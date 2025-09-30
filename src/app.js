require("dotenv").config();

const express = require("express");
const morgan = require("morgan"); //info consola
const cors = require("cors"); // conexión desde otro dominio
const jwt = require("jsonwebtoken"); //  autenticación
const mongoose = require("mongoose"); // conexión  MongoDB
const Joi = require("joi"); //validacion de datos
const users = []; // Almacenamiento temporal en memoria
const SECRET_KEY = process.env.SECRET_KEY;
const authRouter = require("./routes/auth.router");
const authMiddleWare = require("./middlewares/auth.middleware");
const privateRouter = require("./routes/private.routes.js");
const PORT = process.env.PORT;

const app = express();

const connectMongoDB = require("./models/mongo.connection");
(async () => {
  try {
    await connectMongoDB();
  } catch (error) {
    console.error(
      "Ha ocurrido un error al conectarse a la base de datos de MongoDB",
      error
    );
    process.exit(1);
  }
})();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/v1/auth", authRouter); //rutas publicas

app.use(authMiddleWare); //por fuera del authrouter, el resto requerira pasar el authmiddleware

app.use("/v1", privateRouter);

(async () => {
  await connectMongoDB();
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
  );
})();
