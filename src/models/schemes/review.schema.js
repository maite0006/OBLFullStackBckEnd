const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    comentario: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    multimediaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Multimedia",
       required: true, 
    }, // referencia al multimedia
    etiquetaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etiqueta",
      required: true, 
    }, // referencia a la etiqueta
  },
  {
    timestamps: true,
  }
);

module.exports = reviewSchema;
