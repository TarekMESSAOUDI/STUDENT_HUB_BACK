const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentModel = new Schema({
  nom: {type: String},
  type: { type: String, default: "SCOLAIRE" },
  categorie:{type: String, default: "COURS"},
  date: { type: String, default: new Date().toISOString() },
  universite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matiere",
  },
});

module.exports = mongoose.model("Document", documentModel);
