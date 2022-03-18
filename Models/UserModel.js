const mongoose = require("mongoose")
const Schema = mongoose.Schema

let userModel=new Schema({
    nom:{type:String,required:true},
    prenom:{type:String},
    titre:{type:String},
    email:{type:String,required:true},
    tel:{type:String},
    cin:{type:String,required:true},
    addresse:{type:String},
    dateNaissance:{type:Date,required:true},
    mdp:{type:String,required:true, default:new Date()},
    confirmMdp:{type:String,required:true, default:new Date()},
    desactiver:{type:Boolean},
    resettoken:{type:String},
    disponibilite:{type:String},
    rang:{type:Number},
    image:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        },
    sex:{
            type: mongoose.Schema.Types.String,
            ref: "Sex"
        },
    role:{
            type: mongoose.Schema.Types.String,
            ref: "Role"
        },
});

module.exports = mongoose.model("User", userModel)