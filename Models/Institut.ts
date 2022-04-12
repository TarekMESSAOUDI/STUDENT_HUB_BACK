const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const institutModel = new Schema({
  nom: { type: String, required: true },
});

module.exports = mongoose.model("Institut", institutModel);