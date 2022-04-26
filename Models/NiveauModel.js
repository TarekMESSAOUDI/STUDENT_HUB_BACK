const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let niveauModel = new Schema({
    nom: { type: String, required: true },
    specialite:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialite",
    }

});

module.exports = mongoose.model("Niveau", niveauModel);