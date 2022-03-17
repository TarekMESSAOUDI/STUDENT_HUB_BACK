import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let emploisSchema=new mongoose.Schema({
    nom:{type:String,required:true},
    dasemaineta:{type:String,required:true},
    date:{type:Date,default:new Date()},
    tache:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tache"
        }
    ],
});

emploisSchema.plugin(mongoosePaginate);

const Emplois=mongoose.model("Emplois",emploisSchema);

export default Emplois;