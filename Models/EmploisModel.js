const mongoose = require("mongoose")
const Schema = mongoose.Schema

let emploisModel=new Schema({
    nom:{type:String,required:true},
    semaine:{type:String,required:true},
    date:{type:Date,default:new Date()},
    tache:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tache"
        }
    ],
});

module.exports = mongoose.model("Emplois", emploisModel)