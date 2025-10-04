const express = require("express");
const router = express.Router();
const payloadMiddleWare = require("../middlewares/payload.middleware");
const reviewSchemaValidations = require("./joiValidations/review.validations");
const {
  getAllReviews,
  createNewReview,
} = require("../controllers/review.controller");
// rutas del contenirdo reseñas
router.get("/reviews", getAllReviews);
/* router.get("/resenas/:id"); */
router.post("/review", payloadMiddleWare(reviewSchemaValidations), createNewReview);
 router.delete("/resenas/:id");

/*router.put("/resenas/:id"); */

module.exports = router;
