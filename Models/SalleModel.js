const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let salleModel = new Schema({
    numero: { type: String, required: true },
    bloc: {type: String},
    etage: {type: String},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Salle", salleModel);