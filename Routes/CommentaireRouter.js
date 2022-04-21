const express = require("express");
const commentaireRouter = express.Router();
const Commentaire = require("../Models/CommentaireModel");
const Blog = require("../Models/BlogModel");
const { json } = require("swig/lib/filters");
var ObjectId = require("mongoose").Types.ObjectId;

//http://localhost:9091/commentaire/getAll
commentaireRouter.route("/getAll").get((req, res) => {
  Commentaire.find({}, (err, commentaires) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(commentaires);
    }
  }).populate("reponse");
});

//http://localhost:9091/commentaire/getById/idCommentaire
commentaireRouter.route("/getById/:idCommentaire").get((req, res) => {
  Commentaire.findById({_id : req.params.idCommentaire}, (err, commentaires) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(commentaires);
    }
  }).populate("reponse", "description -_id").populate("user");
});

//http://localhost:9091/commentaire/getReponseByIdCommentaire/idCommentaire
commentaireRouter.route("/getReponseByIdCommentaire/:idCommentaire").get((req, res) => {
  Commentaire.find({reponse : req.params.idCommentaire}, (err, commentaires) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(commentaires);
    }
  }).populate("user", "nom prenom profileImage");
});

//http://localhost:9091/commentaire/getByBlogId/idBlog
commentaireRouter.route("/getByBlogId/:idBlog").get((req, res) => {
  Commentaire.find({blog : req.params.idBlog}, (err, commentaires) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(commentaires);
    }
  }).populate("reponse").populate("user" , "nom prenom profileImage");
});

//http://localhost:9091/commentaire/addCommentaire/idBlog
commentaireRouter.route("/addCommentaire/:idBlog").post((req, res) => {
  const commentaire = new Commentaire({
    description: req.body.description,
    user: req.body.user,
    blog: req.params.idBlog,
  });
  commentaire.save((err, commentaire)=>{
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(commentaire);
    }
  });
});

//http://localhost:9091/commentaire/Reponse/idCommentaire
commentaireRouter.route("/Reponse/:idCommentaire").post((req, res) => {
  let reponse = new Commentaire(req.body);
  reponse.reponse = req.params.idCommentaire;
  reponse.save((err, reponse) =>{
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(reponse);
    }
  });
});

//http://localhost:9091/commentaire/deleteCommentaire/idCommentaire
commentaireRouter.route("/deleteCommentaire/:idCommentaire").delete((req, res) => {
  Commentaire.findByIdAndDelete(req.params.idCommentaire, (err, commentaire) => {
    if(err){
      res.status(400).json(err);
    } else {
      Commentaire.deleteMany({reponse: req.params.idCommentaire}, (errr, reponse) => {
        if(errr){
          res.status(400).json(errr);
        } else {
          res.status(200).json(commentaire)
        }
      })
    }
  });
});

//http://localhost:9091/Commentaire/Update/idCommentaire
commentaireRouter.route("/Update/:idCommentaire").put((req, res) => {
    if (!ObjectId.isValid(req.params.idCommentaire)){
        return res.status(400).json(`Pas d'enregistrement avec ce ID : ${req.params.idCommentaire}`);
    } else {
        Commentaire.findByIdAndUpdate(
            req.params.idCommentaire,{ 
                $set: req.body 
            },
            { 
                new: true 
            },(err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log("Error in User Update :" + JSON.stringify(err, undefined, 2));
                }
            }
        ).populate("reponse");
    }
});

//http://localhost:9091/Commentaire/CountCommentaireByBlogId/idBlog
commentaireRouter.route("/CountCommentaireByBlogId/:idBlog").get((req, res) => {
  Commentaire.count({blog: req.params.idBlog}, (err, number) => {
    if(err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(number);
    }
  });
});

//http://localhost:9091/Commentaire/CountCommentaire
commentaireRouter.route("/CountCommentaire").get((req, res) => {
  Commentaire.count({}, (err, number) => {
    if(err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(number);
    }
  });
});

module.exports = commentaireRouter;
