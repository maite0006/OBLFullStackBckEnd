const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    plan: { type: String, enum: ["plus", "premium"], default: "plus" },
    fecha: { type: Date, default: Date.now }, // fecha de creación del usuario,
    reseñas: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Review" }, //colección de reseñas(sin crear todavia)
    ],
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Multimedia" }],
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;