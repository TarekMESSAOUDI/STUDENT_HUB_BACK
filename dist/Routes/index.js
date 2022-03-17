"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Blog_model_1 = __importDefault(require("../Models/Blog.model"));
const User_model_1 = __importDefault(require("../Models/User.model"));
//instancier Express
const app = (0, express_1.default)();
//Middleware bodyParser pour parser le corps des requetes en Json
app.use(body_parser_1.default.json());
//Middleware pour configurer le dossier des requetes en Json
app.use((0, serve_static_1.default)("public"));
//Activer CORS
app.use((0, cors_1.default)());
//Connection à MongoDB
const uri = "mongodb://localhost:27017/StudentHub";
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MongoDB connected Succefuly");
    }
});
app.get("/", (req, res) => {
    res.send("Hello Express");
});
//Blog
//http://localhost:9091/Blogs
app.get("/Blogs", (req, res) => {
    Blog_model_1.default.find((err, Blogs) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(Blogs);
    });
});
//http://localhost:9091/Blog/id
app.get("/Blog/:id", (req, res) => {
    Blog_model_1.default.findById(req.params.id, (err, blog) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(blog);
    });
});
//http://localhost:9091/Blog
app.post("/Blog", (req, res) => {
    let blog = new Blog_model_1.default(req.body);
    blog.save((err) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(blog);
    });
});
//http://localhost:9091/Blog/id
app.put("/Blog/:id", (req, res) => {
    Blog_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, blog) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(blog);
    });
});
//http://localhost:9091/Blog/id
app.delete("/Blog/:id", (req, res) => {
    Blog_model_1.default.deleteOne({ _id: req.params.id }, err => {
        if (err)
            res.status(500).send(err);
        else
            res.send("Blog Deleted Succefuly :)");
    });
});
//User
//http://localhost:9091/Users
app.get("/Users", (req, res) => {
    User_model_1.default.find((err, Users) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(Users);
    });
});
//http://localhost:9091/User/id
app.get("/User/:id", (req, res) => {
    User_model_1.default.findById(req.params.id, (err, User) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(User);
    });
});
//http://localhost:9091/User
app.post("/User", (req, res) => {
    let user = new User_model_1.default(req.body);
    user.save((err) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(user);
    });
});
//http://localhost:9091/User/id
app.put("/User/:id", (req, res) => {
    User_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(user);
    });
});
//http://localhost:9091/User/id
app.delete("/User/:id", (req, res) => {
    User_model_1.default.deleteOne({ _id: req.params.id }, err => {
        if (err)
            res.status(500).send(err);
        else
            res.send("User Deleted Succefuly :)");
    });
});
app.listen(9091, () => {
    console.log("Server Started on Port 9091");
});
