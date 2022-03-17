import express, {Request,Response} from "express";
import bodyParser from "body-parser";
import serveStatic from "serve-static";
import mongoose from "mongoose";
import cors from "cors";
import Blog from "../Models/Blog.model";
import User from "../Models/User.model";

//instancier Express
const app=express();

//Middleware bodyParser pour parser le corps des requetes en Json
app.use(bodyParser.json());

//Middleware pour configurer le dossier des requetes en Json
app.use(serveStatic("public"));

//Activer CORS
app.use(cors());

//Connection à MongoDB
const uri:string="mongodb://localhost:27017/StudentHub";
mongoose.connect(uri,(err)=>{
    if(err){console.log(err)}
    else{console.log("MongoDB connected Succefuly");}
});

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello Express");
});

//Blog
//http://localhost:9091/Blogs
app.get("/Blogs",(req:Request,res:Response)=>{
    Blog.find((err,Blogs)=>{
        if(err) res.status(500).send(err)
        else res.send(Blogs);
    });
});

//http://localhost:9091/Blog/id
app.get("/Blog/:id",(req:Request,res:Response)=>{
    Blog.findById(req.params.id,(err: any,blog: any)=>{
        if(err) res.status(500).send(err)
        else res.send(blog);
    });
});

//http://localhost:9091/Blog
app.post("/Blog",(req:Request,res:Response)=>{
    let blog=new Blog(req.body);
    blog.save((err: any)=>{
        if(err) res.status(500).send(err);
        else res.send(blog);
    });
});

//http://localhost:9091/Blog/id
app.put("/Blog/:id",(req:Request,res:Response)=>{
    Blog.findByIdAndUpdate(req.params.id,req.body,(err: any,blog: any)=>{
        if(err) res.status(500).send(err);
        else res.send(blog);
    });
});

//http://localhost:9091/Blog/id
app.delete("/Blog/:id",(req:Request,res:Response)=>{
    Blog.deleteOne({_id:req.params.id},err=>{
        if(err) res.status(500).send(err);
        else res.send("Blog Deleted Succefuly :)");
    });
});

//User
//http://localhost:9091/Users
app.get("/Users",(req:Request,res:Response)=>{
    User.find((err,Users)=>{
        if(err) res.status(500).send(err)
        else res.send(Users);
    });
});

//http://localhost:9091/User/id
app.get("/User/:id",(req:Request,res:Response)=>{
    User.findById(req.params.id,(err: any,User: any)=>{
        if(err) res.status(500).send(err)
        else res.send(User);
    });
});

//http://localhost:9091/User
app.post("/User",(req:Request,res:Response)=>{
    let user=new User(req.body);
    user.save((err: any)=>{
        if(err) res.status(500).send(err);
        else res.send(user);
    });
});

//http://localhost:9091/User/id
app.put("/User/:id",(req:Request,res:Response)=>{
    User.findByIdAndUpdate(req.params.id,req.body,(err: any,user: any)=>{
        if(err) res.status(500).send(err);
        else res.send(user);
    });
});

//http://localhost:9091/User/id
app.delete("/User/:id",(req:Request,res:Response)=>{
    User.deleteOne({_id:req.params.id},err=>{
        if(err) res.status(500).send(err);
        else res.send("User Deleted Succefuly :)");
    });
});

app.listen(9091,()=>{
    console.log("Server Started on Port 9091");
});