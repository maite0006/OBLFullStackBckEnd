const Review = require("../review.model.js");
const User = require("../user.model.js");

const allReviews = async (userId) => {
  const reviews = await Review.find({
    userId: userId,
  });
  return reviews;
};
const byEtiqueta = async(etiquetaId)=>{
    const reviews=await Review.find({etiquetaId:etiquetaId});
    if(!reviews|| reviews.length === 0){
        const error=new Error("No se han encontrado reviews con esa etiqueta");
        error.status=404;
        throw error;
    }
    return reviews;
} 
const deleteReview=async(id)=>{
    await Review.findByIdAndDelete(id);
}
const createReview = async (
  comentario,
  etiquetaId,
  usuarioId,
  multimediaId
) => {
  const newReview = new Review({
    comentario: comentario,
    etiquetaId: etiquetaId,
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
  byEtiqueta,
  deleteReview
};
