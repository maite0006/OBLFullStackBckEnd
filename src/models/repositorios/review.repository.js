const Review = require("../review.model.js");
const User = require("../user.model.js");

const allReviews = async (userId) => {
  const reviews = await Review.find({
    userId: userId,
  });
  return reviews;
};

// TODO: Poner las etiquetas y pasarle el Id del contenido multimedia
const createReview = async (
  comentario,
  etiqueta,
  usuarioId
  /* multimediaId, */
) => {
  //TODO: Agregar multimediaId
  const newReview = new Review({
    comentario: comentario,
    etiqueta: etiqueta,
    userId: usuarioId,
    /* multimediaId: multimediaId, */
  });

  const user = await User.findById(usuarioId);
  const plan = user.plan;
  // Obtiene todas las reseñas del usuario
  const reviews = await allReviews(usuarioId);

  // Valida el límite correctamente
  if (plan === "plus" && reviews.length >= 10) {
    throw new Error("Limite de reseñas alcanzado, actualice su plan");
  }
  await newReview.save();
};

module.exports = {
  allReviews,
  createReview,
};
