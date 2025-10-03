const { required } = require("joi");
const mongoose = require("mongoose");

const multimediaSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  tipo: { 
    type: String, 
    enum: ["pelicula", "serie", "corto"], 
    required: true 
  },
  descripcion: { type: String, required: true, trim: true },
  duracion: { type: Number },              // en minutos, aplica a peliculas/cortos
  temporadas: { type: Number },            // aplica a series
}, { timestamps: true });

module.exports = multimediaSchema;