const express = require("express");
const { orderBy, groupBy } = require("lodash");
const matiereRouter = express.Router();
const Matiere = require("../Models/MatiereModel");
const User = require("../Models/UserModel");


//http://localhost:9091/Matiere/addMatiere/idUniversite
matiereRouter.route("/addmatiere/:idUniversite").post((req, res) => {
  User.findById(req.params.idUniversite ,(err,user)=>{
    const matiere = new Matiere({
      nom: req.body.nom,
      coef: req.body.coef,
      user: req.params.idUniversite,
    });
    if(err){
      res.status(400)
    } else {
      matiere.save();
      return res.status(200).json(matiere)
    }
  })
});


//http://localhost:9091/Matiere/getMatByUniversiteId/idUniversite
matiereRouter.route("/getMatByUniversiteId/:idUniversite").get((req, res) => {
  Matiere.find({user: req.params.idUniversite}, (err, Matiere) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(Matiere);
    }
  });
});

//http://localhost:9091/Matiere/countMatByUniversiteId/idUniversite
matiereRouter.route("/countMatByUniversiteId/:idUniversite").get((req, res) => {
  Matiere.count({user: req.params.idUniversite}, (err, number) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(number);
    }
  });
});

//http://localhost:9091/Matiere/deleteMatiere/idSalle
matiereRouter.route("/deleteMatiere/:idMatiere").delete((req, res) => {
  Matiere.deleteOne({_id: req.params.idMatiere}, (err, Matiere) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(Matiere);
    }
  });
});

module.exports = matiereRouter;