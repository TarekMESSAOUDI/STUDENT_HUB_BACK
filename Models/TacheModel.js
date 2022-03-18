const mongoose = require("mongoose")
const Schema = mongoose.Schema

let TacheModel=new Schema({
    nom:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,default:new Date()},
    type:{
        type: mongoose.Schema.Types.String,
        ref: "TypeTache"
    }
});

module.exports = mongoose.model("Tache", TacheModel)