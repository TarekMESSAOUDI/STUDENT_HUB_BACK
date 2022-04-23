const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogModel = new Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, default: new Date().toLocaleDateString() },
  image: { type: String, default: "BLOG.jpeg", required: false },
  like: {type: Number, default: 0},
  masquer: {type: Boolean, default: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Blog", blogModel);
