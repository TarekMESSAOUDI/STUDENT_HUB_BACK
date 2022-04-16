const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogModel = new Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: new Date() },
  image: { type: String },
  user: 
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
,
  commentaire: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commentaire",
    },
  ],
});

module.exports = mongoose.model("Blog", blogModel);
