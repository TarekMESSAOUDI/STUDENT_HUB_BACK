import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import Blog from "./Blog.model";

let userSchema=new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sex"
        },
    role:{
            type: mongoose.Schema.Types.String,
            ref: "Role"
        },
});

userSchema.plugin(mongoosePaginate);

const User=mongoose.model("User",userSchema);

export default User;