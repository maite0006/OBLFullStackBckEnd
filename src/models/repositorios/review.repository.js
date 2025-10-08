const Review = require("../review.model.js");


const allReviews = async (userId) => {
  const reviews = await Review.find({
    userId: userId,
  });
  return reviews;
};

const findReviewById = async (id) => {  
  const review = await Review.findById(id);
  return review;
}

const byEtiqueta = async (etiquetaId) => {
  const reviews = await Review.find({ etiquetaId: etiquetaId });
  return reviews;
};

const deleteReview = async (id) => {
  await Review.findByIdAndDelete(id);
};

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
    multimediaId: multimediaId,
  });
  await newReview.save();
  return newReview;
};

const updateReview = async (id, userId, payload) => {
  const review = await Review.findOne({
    _id: id,
    userId: userId,
  });

  if (!review) {
    const err= new Error("Reseña no encontrada");
    err.status=403
    throw err;
  }
  Object.entries(payload).forEach(([key, value]) => {
    review[key] = value;
  });
  await review.save();
};

module.exports = {
  allReviews,
  createReview,
  byEtiqueta,
  deleteReview,
  updateReview,
  findReviewById,
};
