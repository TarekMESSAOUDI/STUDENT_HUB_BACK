import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let blogSchema=new mongoose.Schema({
    titre:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,default:new Date()},
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    commentaire:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Commentaire"
        }
    ],
});

blogSchema.plugin(mongoosePaginate);

const Blog=mongoose.model("Blog",blogSchema);

export default Blog;