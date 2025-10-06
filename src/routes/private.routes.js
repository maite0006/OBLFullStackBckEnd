const express = require("express");
const router = express.Router();
const payloadMiddleWare = require("../middlewares/payload.middleware");
const reviewSchemaValidations = require("./joiValidations/review.validations");
const {
  getAllReviews,
  createNewReview,
  eliminarReview,
  getbyEtiqueta
} = require("../controllers/review.controller");

// rutas del contenirdo reseñas
router.get("/reviews", getAllReviews);
/* router.get("/resenas/:id"); */
router.post("/review", payloadMiddleWare(reviewSchemaValidations), createNewReview);
router.get("/reviews/etiqueta/:etiquetaId", getbyEtiqueta);
router.delete("/reviews/:id", eliminarReview);

/*router.put("/resenas/:id"); */

// Rutas de usuario
const { cambiarP, agregarFavorito,obtenerFavoritos } = require("../controllers/user.controller");

router.post("/user/favorito", agregarFavorito);
router.get("/user/favoritos", obtenerFavoritos);
router.put("/user", cambiarP);

//ruta etiquetas
const { getAllEtiquetas } = require("../controllers/etiqueta.controller");
router.get("/etiquetas", getAllEtiquetas);

module.exports = router;
