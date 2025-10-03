const mongoose = require("mongoose");
const etiquetaScheme = require("./schemes/etiqueta.schema.js");

const Etiqueta = mongoose.model("Etiqueta", etiquetaScheme);

module.exports = Etiqueta;