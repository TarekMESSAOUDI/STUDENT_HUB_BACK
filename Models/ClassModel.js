const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let classModel = new Schema({
    nom: { type: String, required: true },
    niveau: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Niveau",
    },
    universite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model("Class", classModel);
