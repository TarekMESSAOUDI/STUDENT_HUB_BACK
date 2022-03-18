const mongoose = require("mongoose")
const Schema = mongoose.Schema

let imageModel=new Schema({
    nom:{type:String,required:true},
    data:{type:String}
});

module.exports = mongoose.model("Image", imageModel)