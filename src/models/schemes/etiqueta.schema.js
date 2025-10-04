const { required } = require("joi");
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
    trim: true,
    required:true
  },
}, {
  timestamps: true 
});

module.exports = etiquetaSchema;