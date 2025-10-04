const Review = require("../review.model.js");
const User = require("../user.model.js");

const allReviews = async (userId) => {
  const reviews = await Review.find({
    userId: userId,
  });
  return reviews;
};
const getbyEtiqueta=async(etiquetaId)=>{
    const reviews=await Review.find({etiquetaId:etiquetaId});
    return reviews;
} 
const eliminarReview=async(id)=>{
    await Review.findByIdAndDelete(id);
}
const createReview = async (
  comentario,
  etiqueta,
  usuarioId,
  multimediaId, 
  plan
) => {
  const newReview = new Review({
    comentario: comentario,
    etiquetaId: etiqueta,
    userId: usuarioId,
    multimediaId: multimediaId
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
  getbyEtiqueta,
  eliminarReview
};
