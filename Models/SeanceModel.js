const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let seanceModel = new Schema({
    title: { type: String },
    start:{type: String, default: new Date().toISOString()},
    end:{type: String, default: new Date().toISOString()},
    matiere: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Matiere"
    },
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    universite:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    salle:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salle",
    },
    classs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
    
});

module.exports = mongoose.model("Seance", seanceModel);