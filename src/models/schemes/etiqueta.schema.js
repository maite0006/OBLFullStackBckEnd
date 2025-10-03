const mongoose = require("mongoose");

const etiquetaSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true 
  },
  descripcion: {
    type: String,
    trim: true
  },
}, {
  timestamps: true // crea createdAt y updatedAt automáticamente
});

module.exports = etiquetaSchema;