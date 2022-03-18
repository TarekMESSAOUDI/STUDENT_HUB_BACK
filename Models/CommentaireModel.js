const mongoose = require("mongoose")
const Schema = mongoose.Schema

let commentaireModel=new Schema({
    description:{type:String,required:true},
    like:{type:Number},
    date:{type:Date,required:true,default:new Date()},
    masquer:{type:Boolean},
    commentaire:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Commentaire"
        }
    ],
});

module.exports = mongoose.model("Commentaire", commentaireModel)