const express = require("express");
const { orderBy, groupBy } = require("lodash");
const salleRouter = express.Router();
const Salle = require("../Models/SalleModel");
const User = require("../Models/UserModel");

//http://localhost:9091/Salle/addSalle/idUniversite
salleRouter.route("/addSalle/:idUniversite").post((req, res) => {
    User.findById(req.params.idUniversite ,(err,user)=>{
        const salle = new Salle({
            numero: req.body.numero,
            bloc: req.body.bloc,
            etage: req.body.etage,
            user: req.params.idUniversite,
        });
        if(err){
            res.status(401).json(err);
            console.log(err);
        } else {
            salle.save();
            res.status(200).json(salle)
        }
    });
});

//http://localhost:9091/Salle/getSallByUniversiteId/idUniversite
salleRouter.route("/getSallByUniversiteId/:idUniversite").get((req, res) => {
  Salle.find({user: req.params.idUniversite}, (err, salle) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(salle);
    }
  });
});

//http://localhost:9091/Salle/countSallByUniversiteId/idUniversite
salleRouter.route("/countSallByUniversiteId/:idUniversite").get((req, res) => {
  Salle.count({user: req.params.idUniversite}, (err, number) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(number);
    }
  });
});

//http://localhost:9091/Salle/deleteSalle/idSalle
salleRouter.route("/deleteSalle/:idSalle").delete((req, res) => {
  Salle.deleteOne({_id: req.params.idSalle}, (err, salle) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(salle);
    }
  });
});

module.exports = salleRouter;