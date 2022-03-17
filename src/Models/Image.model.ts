import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let imageSchema=new mongoose.Schema({
    nom:{type:String,required:true},
    data:{type:ImageData}
});

imageSchema.plugin(mongoosePaginate);

const Image=mongoose.model("Image",imageSchema);

export default Image;