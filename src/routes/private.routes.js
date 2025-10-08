const express = require("express");
const router = express.Router();
const payloadMiddleWare = require("../middlewares/payload.middleware");
const reviewSchemaValidations = require("./joiValidations/review.validations");

const {
  getAllReviews,
  createNewReview,
  eliminarReview,
  getbyEtiqueta,
  putReview,
  getReviewById,
} = require("../controllers/review.controller");

// rutas del contenirdo reseñas
router.get("/reviews", getAllReviews);
router.post("/review", payloadMiddleWare(reviewSchemaValidations), createNewReview);
router.delete("/reviews/:id", eliminarReview);
router.get("/reviews/etiqueta/:etiquetaId", getbyEtiqueta);
router.put(
  "/reviews/:id",
  /*   payloadMiddleWare(reviewSchemaValidations),
  */ putReview
);
router.get("/reviews/:id", getReviewById);

// Rutas de usuario
const {
  cambiarP,
  agregarFavorito,
  obtenerFavoritos,
} = require("../controllers/user.controller");

router.post("/user/favorito", agregarFavorito);
router.get("/user/favoritos", obtenerFavoritos);
router.put("/user", cambiarP);

//ruta etiquetas
const { getAllEtiquetas } = require("../controllers/etiqueta.controller");
router.get("/etiquetas", getAllEtiquetas);

module.exports = router;
