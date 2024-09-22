const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  image: String,
});

const ImageModel = new mongoose.model("ImageModel", UserSchema);

module.exports = ImageModel;
