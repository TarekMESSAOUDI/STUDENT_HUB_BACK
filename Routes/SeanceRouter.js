const express = require("express");
const seanceRouter = express.Router();
const Seance = require("../Models/SeanceModel");
const User = require("../Models/UserModel");

//http://localhost:9091/Seance/AddSeance/idUniversite
seanceRouter.route("/AddSeance/:idUniversite").post((req, res) => {
    User.findById(req.params.idUniversite ,(err,user)=>{
    const seance = new Seance({
      type: req.body.type,
      matiere: req.body.matiere,
      enseignant: req.body.enseignant,
      universite: req.params.idUniversite,
      salle: req.body.salle,
      class: req.body.class,
    });
    if(err){
      res.status(401)
    } else {
        seance.save();
        res.status(200).json(seance)
    }
  });
});

//http://localhost:9091/Seance/getByIdUniversite/idUniversite
seanceRouter.route("/getByIdUniversite/:idUniversite").get((req, res) => {
  Seance.find({universite: req.params.idUniversite}, (err, seance) => {
    if (err) {
      res.status(401).json(err);
      console.log(err);
    } else {
      res.status(200).json(seance);
    }
  }).populate("universite", "nom -_id")
    .populate("enseignant", "nom prenom -_id")
    .populate("salle", "numero bloc etage -_id")
    .populate("class", "nom -_id")
    .populate("matiere", "nom -_id");
});

//http://localhost:9091/Seance/getByIdClass/idClass
seanceRouter.route("/getByIdClass/:idClass").get((req, res) => {
  Seance.find({class: req.params.idClass}, (err, seance) => {
    if (err) {
      res.status(401).json(err);
      console.log(err);
    } else {
      res.status(200).json(seance);
    }
  }).populate("universite", "nom -_id")
    .populate("enseignant", "nom prenom -_id")
    .populate("salle", "numero bloc etage -_id")
    .populate("class", "nom -_id")
    .populate("matiere", "nom -_id");
});

module.exports = seanceRouter;