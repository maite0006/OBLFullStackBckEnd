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
const Multimedia = require("./models/multimedia.model");

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

//por fuera del authrouter, el resto requerira pasar el authmiddleware

app.use("/v1",authMiddleWare, privateRouter);



(async () => {
  await connectMongoDB();
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
  );
})();

const precargarMultimedia = async () => {
  const count = await Multimedia.countDocuments();
  if (count === 0) {
    await Multimedia.insertMany([
      { titulo: "Game of Thrones", tipo: "serie", descripcion:"Drama y fantasia mediaval basada en el libro de George R.R 'A Song of Ice and Fire'", temporadas: 8 },
    ]);
    console.log("Multimedia precargada al iniciar la app");
  }
};

precargarEtiquetas = async () => {  
  const Etiqueta = require("./models/etiqueta.model");
  const count = await Etiqueta.countDocuments();
  if (count === 0) {  
    await Etiqueta.insertMany([
      { nombre: "Critica", descripcion: "Reseña crítica y detallada de la obra a analizar" },
      { nombre: "Recomendacion", descripcion: "Sugerencia positiva para ver la obra" },
      { nombre: "Comentario", descripcion: "Opinión personal sobre la obra" },
      { nombre: "Analisis", descripcion: "Examen profundo de los elementos de la obra" },
      { nombre: "Resumen", descripcion: "Síntesis breve de la trama o contenido de la obra" }
    ]);
    console.log("Etiquetas precargadas al iniciar la app");
  } 
};
precargarEtiquetas();

// después de mongoose.connect(...)
precargarMultimedia();
