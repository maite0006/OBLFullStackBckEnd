const {
  allReviews,
  createReview,
  deleteReview,
  byEtiqueta,
  updateReview,
} = require("../models/repositorios/review.repository");

const getAllReviews = async (req, res) => {
  const { id } = req.user;
  try {
    const todos = await allReviews(id);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: `Ha ocurrido un error` });
  }
};

const getbyEtiqueta = async (req, res) => {
  const { etiquetaId } = req.params;
  try {
    const reviews = await byEtiqueta(etiquetaId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: `Ha ocurrido un error` });
  }
};

const createNewReview = async (req, res) => {
  const { body, user } = req;
  try {
    await createReview(
      body.comentario,
      body.etiquetaId,
      user.id,
      body.multimediaId
    );
    res.status(201).json({
      message: "Reseña creada correctamente",
    });
  } catch (error) {
    console.log(error);

    res
      .status(error.status || 500)
      .json({ message: error.message || "Ha ocurrido un error" });
  }
};

const eliminarReview = async (req, res) => {
  const { id } = req.params.id;
  try {
    await deleteReview(id);
    res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: `Ha ocurrido un error` });
  }
};

const putReview = async (req, res) => {
  const reviewId = req.params.id;
  const { id } = req.user;
  const { body } = req;
  /*   console.log(body);
   */
  try {
    await updateReview(reviewId, id, body);
    res.status(200).json({ message: "Reseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message || `Ha ocurrido un error` });
  }
};

module.exports = {
  getAllReviews,
  createNewReview,
  eliminarReview,
  getbyEtiqueta,
  putReview,
};
