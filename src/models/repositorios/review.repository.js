const Review = require("../review.model.js");

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
  usuarioId,
  /* multimediaId, */
  plan
) => {
  //TODO: Agregar multimediaId
  const newReview = new Review({
    comentario: comentario,
    etiqueta: etiqueta,
    userId: usuarioId,
    /* multimediaId: multimediaId, */
  });

  // Obtiene todas las reseñas del usuario
  const reviews = await allReviews(usuarioId);

  // Valida el límite correctamente
  if (reviews.length >= 10 && plan === "plus") {
    throw new Error("Limite de reseñas alcanzado, actualice su plan");
  }
  await newReview.save();
};

module.exports = {
  allReviews,
  createReview,
};
