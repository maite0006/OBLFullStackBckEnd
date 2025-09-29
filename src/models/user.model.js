const mongoose = require("mongoose");
const userSchema = require("./schemes/user.schema");

const User = mongoose.model("User", userSchema);

module.exports = User;