import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let blogSchema=new mongoose.Schema({
    nom:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,default:new Date()},
    type:{type:TYPETACHE},
});

blogSchema.plugin(mongoosePaginate);

const Blog=mongoose.model("Blog",blogSchema);

export default Blog;