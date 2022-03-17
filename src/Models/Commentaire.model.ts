import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let commentaireSchema=new mongoose.Schema({
    description:{type:String,required:true},
    like:{type:Number},
    date:{type:Date,default:new Date()},
    masquer:{type:Boolean},
    commentaire:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Commentaire"
        }
    ],
});

commentaireSchema.plugin(mongoosePaginate);

const Commentaire=mongoose.model("Commentaire",commentaireSchema);

export default Commentaire;