const { times } = require("lodash");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let seanceModel = new Schema({
    type: { type: String },
    startAt:{type: Date, default: new Date()},
    endAt:{type: Date, default: new Date()},
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
    class:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
    
});

module.exports = mongoose.model("Seance", seanceModel);