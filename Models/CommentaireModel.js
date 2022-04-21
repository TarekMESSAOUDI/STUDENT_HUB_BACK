const mongoose = require("mongoose")
const Schema = mongoose.Schema

let commentaireModel=new Schema({
    description:{type:String,required:true},
    like:{type:Number, default: 0},
    date:{type:String, default:new Date().toLocaleDateString()},
    masquer:{type:Boolean, default: false},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    reponse:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commentaire",
        default: null,
    }
});

module.exports = mongoose.model("Commentaire", commentaireModel)