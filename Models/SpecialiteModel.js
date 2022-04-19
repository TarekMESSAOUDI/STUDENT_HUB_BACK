const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let specialiteModel = new Schema({
    nom: { type: String, required: true },
    acro: { type: String},
    filiere:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Filiere",
    },
});

module.exports = mongoose.model("Specialite", specialiteModel);