const mongoose = require("mongoose");
const multimediaSchema = require("./schemes/multimedia.schema.js");

const Review = mongoose.model("Multimedia", multimediaSchema);

module.exports = Multimedia;