const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let filierModel = new Schema({
    nom: { type: String, required: true },
    user:{
        type: mongoose.Schema.Types.ObjectId,
            ref: "User",
    },
});

module.exports = mongoose.model("Filiere", filierModel);