const {
  allReviews,
  createReview,
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

const createNewReview = async (req, res) => {
  const { body, user } = req;
  try {
    await createReview(
      body.comentario,
      body.etiqueta,
      user.id
      /* body.multimediaId, */
    );
    res.status(201).json({
      message: "Reseña creada correctamente",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: `Ha ocurrido un error` });
  }
};

module.exports = {
  getAllReviews,
  createNewReview,
};
