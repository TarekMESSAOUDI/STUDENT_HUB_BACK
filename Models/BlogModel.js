const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogModel = new Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, default: new Date().toLocaleDateString() },
  image: { type: String },
  like: {type: Number, default: 0},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Blog", blogModel);
