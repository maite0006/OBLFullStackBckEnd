const {
  allReviews,
  createReview,
  deleteReview,
  byEtiqueta,
  updateReview,
  findReviewById,
} = require("../models/repositorios/review.repository");
const { findUserByEmail } = require("../models/repositorios/user.repository");

const getAllReviews = async (req, res) => {
  const { id } = req.user;
  try {
    const todos = await allReviews(id);
    if (todos.length === 0) {
      return res.status(200).json({ message: "No se han encontrado reviews" });
    }
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: `Ha ocurrido un error` });
  }
};
const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await findReviewById(id);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ message: `Ha ocurrido un error` });
  }
};

const getbyEtiqueta = async (req, res) => {
  const { etiquetaId } = req.params;
  try {
    const reviews = await byEtiqueta(etiquetaId);
    if (reviews.length === 0) {
      return res
        .status(200)
        .json({ message: "No se han encontrado reviews para la etiqueta" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Ha ocurrido un error" });
  }
};

const createNewReview = async (req, res) => {
  const { body, user } = req;
  const usuario = await findUserByEmail(user.email); // documento real con reseñas
  const usuarioId = user.id;
  const plan = usuario.plan;

  // Obtiene todas las reseñas del usuario
  const reviews = await allReviews(usuarioId);

  // Valida el límite correctamente
  if (plan === "plus" && reviews.length >= 10) {
    return res
      .status(403)
      .json({ message: "Limite de reseñas alcanzado, actualice su plan" });
  }

  try {
    const reseña = await createReview(
      body.comentario,
      body.etiquetaId,
      user.id,
      body.multimediaId
    );
    usuario.reseñas.push(reseña._id);
    await usuario.save();
    return res.status(201).json({ message: "Reseña creada correctamente" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Ha ocurrido un error" });
  }
};

const eliminarReview = async (req, res) => {
  const { id } = req.params.id;
  try {
    await deleteReview(id);
    return res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: `Ha ocurrido un error` });
  }
};

const putReview = async (req, res) => {
  const reviewId = req.params.id;
  const { id } = req.user;
  const { body } = req;
  try {
    await updateReview(reviewId, id, body);
    return res
      .status(200)
      .json({ message: "Reseña actualizada correctamente" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Ha ocurrido un error" });
  }
};

module.exports = {
  getAllReviews,
  createNewReview,
  eliminarReview,
  getbyEtiqueta,
  putReview,
  getReviewById,
};
