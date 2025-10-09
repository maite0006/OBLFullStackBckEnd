//func coneccion a mongo
const mongoose = require("mongoose");
const connectMongoDB = async () => {
  const MONGOB_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
  const DB_NAME = process.env.DB_NAME;

  await mongoose.connect(MONGOB_CONNECTION_STRING, {
    serverSelectionTimeoutMS: 9000,
    dbName: DB_NAME,
  });
  console.log("Conectado a MongoDB");
};
module.exports = connectMongoDB;
