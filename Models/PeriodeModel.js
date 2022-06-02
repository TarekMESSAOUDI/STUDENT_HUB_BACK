const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const periodeModel = new Schema({
  start: { type: String,default: new Date().toISOString().slice(0,10) },
  end: { type: String,default: new Date().toISOString().slice(0,10) },
  description: { type: String},
  universite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Periode", periodeModel);
