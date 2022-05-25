const express = require("express");
const seanceRouter = express.Router();
const Seance = require("../Models/SeanceModel");
const User = require("../Models/UserModel");
const Matiere = require("../Models/MatiereModel");
const Salle = require("../Models/SalleModel");
const Classe = require("../Models/ClassModel");


//http://localhost:9091/Seance/AddSeance/idUniversite
seanceRouter.route("/AddSeance/:idUniversite").post((req, res) => {
    User.findById(req.params.idUniversite ,async(err,user)=>{
    const seance = new Seance({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      matiere :req.body.matiere ,
      enseignant: req.body.enseignant,
      universite: req.params.idUniversite,
      salle: req.body.salle,
      classs: req.body.classs,
    });
    if(err){
      res.status(401)
    } else {
      let mat = await Matiere.findById(seance.matiere)
      let sal = await Salle.findById(seance.salle)
      let ens = await User.findById(seance.enseignant)
      seance.title =await  req.body.title + ": " + mat.nom + " " + sal.bloc + sal.etage + sal.numero + " (M." + ens.nom + " " + ens.prenom + ")",
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
      res.status(200).send(seance);
    }
  }).populate("universite", "nom -_id")
    .populate("enseignant", "nom prenom -_id")
    .populate("salle", "numero bloc etage -_id")
    .populate("classs", "nom -_id")
    .populate("matiere", "nom -_id");
});

//http://localhost:9091/Seance/getByIdClass/idClass
seanceRouter.route("/getByIdClass/:idClass").get((req, res) => {
  Seance.find({classs: req.params.idClass}, (err, seance) => {
    if (err) {
      res.status(401).json(err);
      console.log(err);
    } else {
      res.status(200).json(seance);
    }
  }).populate("universite", "nom -_id")
    .populate("enseignant", "nom prenom -_id")
    .populate("salle", "numero bloc etage -_id")
    .populate("classs", "nom -_id")
    .populate("matiere", "nom -_id");
});

//http://localhost:9091/Seance/getByIdEnseignant/idEnseignant
seanceRouter.route("/getByIdEnseignant/:idEnseignant").get((req, res) => {
  Seance.find({enseignant: req.params.idEnseignant}, (err, seance) => {
    if (err) {
      res.status(401).json(err);
      console.log(err);
    } else {
      res.status(200).json(seance);
    }
  }).populate("universite", "nom -_id")
    .populate("enseignant", "nom prenom -_id")
    .populate("salle", "numero bloc etage -_id")
    .populate("Class", "nom -_id")
    .populate("matiere", "nom -_id");
});

//http://localhost:9091/Seance/deleteSeance/idSeance
seanceRouter.route("/deleteSeance/:idSeance").delete((req, res) => {
  Seance.findByIdAndDelete((req.params.idSeance),(err, seance) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json("Seance Deleted Succefully");
    }
  });
});

module.exports = seanceRouter;