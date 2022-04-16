const express = require("express");
const blogRouter = express.Router();
const Blog = require("../Models/BlogModel");
const User = require("../Models/UserModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images/User");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("le fichier doit etre jpeg, jpg ou png"), null, false);
  }
};

const image = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

blogRouter
  .route("/")
  //http://localhost:9091/blog
  .get((req, res) => {
    Blog.find({}, (err, users) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(users);
      }
    });
  });

//http://localhost:9091/blog
blogRouter.route("/:id")
.post(image.single("image"), (req, res) => {
  let blog = new Blog(req.body);
  blog.image = req.file.originalname;
  const idBlog = blog._id;
  User.findById(req.params.id, (err, user) => {
    user.blogs.push(blog);
    console.log(user);
    user.save();
    blog.user = user._id;
    console.log(blog);
    blog.save();
  });
  res.status(201).send(blog);
});

blogRouter
  .route("/:id")
  //http://localhost:9091/blog/id
  .get((req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
      if (err) {
        res.send(400).json(err);
      } else {
        res.json(blog);
      }
    });
  });

blogRouter
  .route("/:id")
  //http://localhost:9091/blog/id
  .put((req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
      blog.titre = req.body.titre;
      blog.description = req.body.description;
      blog.save();
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(blog);
      }
    });
  });

blogRouter
  .route("/:id")
  //http://localhost:9091/blog/id
  .delete((req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
      blog.delete((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204);
          console.log("Blog Supprimé");
        }
      });
    });
  });

module.exports = blogRouter;
