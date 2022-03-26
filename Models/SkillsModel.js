const mongoose = require("mongoose")
const Schema = mongoose.Schema

const skillsModel=new Schema({
    nom:{type:String,required:true},
});

module.exports = mongoose.model("Skills", skillsModel)