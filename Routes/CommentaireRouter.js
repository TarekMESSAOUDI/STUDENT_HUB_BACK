const express = require("express");
const commentaireRouter = express.Router();
const Commentaire = require("../Models/CommentaireModel");
const Blog = require("../Models/BlogModel");

commentaireRouter
  .route("/")
  //get all commentaires
  //http://localhost:9091/commentaire
  .get((req, res) => {
    Commentaire.find({}, (err, commentaires) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(commentaires);
      }
    });
  });

/*commentaireRouter
  .route("/:id")
  // add commentaire to blog
  //http://localhost:9091/commentaire/id
  .post((req, res) => {
    let commentaire = new Commentaire(req.body);
     Commentaire.create(commentaire).then((docCommentaire) => {
      return Blog.findByIdAndUpdate(
        req.params.id,
        {
          $push: { commentaire: docCommentaire._id },
        },
        {
          new: true,
          useFindAndModify: false,
        }
        
      );
      
    });
    return res.status(200).json(commentaire)
  });*/

commentaireRouter
  .route("/Reponse/:id")
  // repondre a commentaire
  //http://localhost:9091/commentaire/Reponse/id
  .post((req, res) => {
    let commentaire = new Commentaire(req.body);
    return Commentaire.create(commentaire).then((docCommentaire) => {
      return Commentaire.findByIdAndUpdate(
        req.params.id,
        {
          $push: { commentaire: docCommentaire._id },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
    });
  });

commentaireRouter
  .route("/:id")
  //http://localhost:9091/commentaire/id
  .delete((req, res) => {
    Commentaire.findById(req.params.id, (err, commentaire) => {
      commentaire.delete((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send("removed");
        }
      });
    });
  });
module.exports = commentaireRouter;
