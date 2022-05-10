const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let matiereModel = new Schema({
    nom: { type: String, required: true },
    coef: {type: String},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Matiere", matiereModel);