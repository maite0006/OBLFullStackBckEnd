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
router.delete("/reviews/:id", eliminarReview);
router.get("/reviews/etiqueta/:etiquetaId", getbyEtiqueta);

/*router.put("/resenas/:id"); */

// Rutas de usuario
const { cambiarP, agregarFavorito } = require("../controllers/user.controller");

router.put("/user", cambiarP);
router.post("/user/favoritos", agregarFavorito);

//ruta etiquetas
const { getAllEtiquetas } = require("../controllers/etiqueta.controller");
router.get("/etiquetas", getAllEtiquetas);

module.exports = router;
