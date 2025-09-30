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
      //TODO; Cambiarlo a ture al required
      /* require: true, */
    }, // referencia al multimedia
    etiqueta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etiqueta",
      // TODO: Cambiarlo a ture al required
      /* require: true, */
    }, // referencia a la etiqueta
  },
  {
    timestamps: true,
  }
);

module.exports = reviewSchema;
