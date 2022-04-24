const express = require("express");
const blogRouter = express.Router();
const Blog = require("../Models/BlogModel");
const User = require("../Models/UserModel");
const Commentaire = require("../Models/CommentaireModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images/Blog");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("le fichier doit etre jpeg, jfif, jpg ou png"), null, false);
  }
};

const image = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//http://localhost:9091/Blog/getAll
blogRouter.route("/getAll").get((req, res) => {
  Blog.find({masquer: false}, (err, blogs) => {
    if (err) {
      console.log(err)
      res.status(400).json(err);
    } else {
      res.status(200).json(blogs);
    }
  }).populate("user", "nom prenom profileImage");
});

//http://localhost:9091/Blog/addBlog/id
blogRouter.route("/addBlog/:idUser").post((req, res) => {
  User.findById(req.params.idUser ,(err,user)=>{
    const blog = new Blog({
      titre: req.body.titre,
      description: req.body.description,
      user: req.params.idUser,
      masquer: true
    });
    if(err){
      res.status(400)
    } else {
      blog.save();
      return res.status(200).json(blog)
    }
  })
});

//http://localhost:9091/Blog/ajouterBlog/idUser
blogRouter.route("/ajouterBlog/:idUser").post((req, res) => {
  User.findById(req.params.idUser ,(err,user)=>{
    const blog = new Blog({
      titre: req.body.titre,
      description: req.body.description,
      masquer: false,
      user: req.params.idUser,
    });
    if(err){
      res.status(400)
    } else {
      blog.save();
      return res.status(200).json(blog)
    }
  })
});

//http://localhost:9091/Blog/Image/idBlog
blogRouter.route("/Image/:idBlog").put(image.single("image"), (req, res) => {
  Blog.findById(req.params.idBlog, (err, blog) => {
    blog.image = req.file.originalname;
    blog.masquer = false;
    blog.save();
    if (err) {
      res.sendStatus(400);
    } else {
      res.json(blog);
    }
  });
});

//http://localhost:9091/blog/getById/idBlog
blogRouter.route("/getById/:idBlog").get((req, res) => {
  Blog.findById(req.params.idBlog, (err, blog) => {
    if (err) {
      res.status(401).json(err);
      console.log(err);
    } else {
      res.status(200).json(blog);
    }
  }).populate("user", "nom prenom profileImage");
});

//http://localhost:9091/blog/findByUserId/idUser
blogRouter.route("/getByUserId/:idUser").get((req, res) => {
  Blog.find({user: req.params.idUser}, (err, blog) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(blog);
    }
  }).populate("user", "nom prenom profileImage");
});

//http://localhost:9091/blog/delete/idBlog
blogRouter.route("/delete/:idBlog").delete((req, res) => {
  Blog.findByIdAndDelete((req.params.idBlog),(err, blog) => {
    if(err){
      res.status(400).json(err);
    } else {
      Commentaire.deleteMany({blog: req.params.idBlog}, (errr, commentaire) => {
        if(errr) {
          res.status(400).json(errr)
        } else {
          res.status(200).json(blog);
        }
      });
    }
  });
});

//http://localhost:9091/Blog/CountBlogByIdUser/idUser
blogRouter.route("/CountBlogByIdUser/:idUser").get((req, res) => {
    Blog.count({user: req.params.idUser},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Blog/CountBlog
blogRouter.route("/CountBlog").get((req, res) => {
    Blog.count({},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Blog/LikeBlog/idBlog
blogRouter.route("/LikeBlog/:idBlog").put((req, res) => {
  Blog.findByIdAndUpdate(req.params.idBlog,{},{ new: true },(err, blog) => {
    if(err){
      res.Status(400) 
    } else {
      blog.like = blog.like + 1;
      blog.save();
      res.status(200).json(blog);
    }
  });
});

module.exports = blogRouter;
