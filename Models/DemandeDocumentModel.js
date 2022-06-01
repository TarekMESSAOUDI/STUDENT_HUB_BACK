const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const demandeDocumentModel = new Schema({
  raison: { type: String },
  dateDemande: { type: String, default: new Date().toISOString() },
  type:{type: String},
  etat: {type: String, default: "Not Yet"},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  universite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("DemandeDocument", demandeDocumentModel);
