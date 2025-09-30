const mongoose = require("mongoose");
const reviewSchema = require("./schemes/review.schema.js");

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
