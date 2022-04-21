const express = require("express");
const niveauRouter = express.Router();
const Niveau = require("../Models/NiveauModel");
const Specialite = require("../Models/SpecialiteModel");
const Class = require("../Models/ClassModel");
var ObjectId = require("mongoose").Types.ObjectId;

//http://localhost:9091/Niveau/getAll
niveauRouter.route("/getAll").get((req,res)=>{
    Niveau.find({},(err, niveau)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(niveau)
        }
    }).populate("specialite", "nom");
});

//http://localhost:9091/Niveau/addNiveau/id
niveauRouter.route("/addNiveau/:idSpecialite").post((req, res) => {
    Specialite.findById(req.params.idSpecialite ,(err,specialite)=>{
        const niveau = new Niveau({
            nom: req.body.nom,
            specialite: req.params.idSpecialite,
        });
        if(err){
            res.status(400).json(err);
        } else {
            niveau.save();
            res.status(200).json(niveau);
        }
    });
});

//http://localhost:9091/Niveau/Update/idNiveau
niveauRouter.route("/Update/:idNiveau").put((req, res) => {
    if (!ObjectId.isValid(req.params.idNiveau)){
        return res.status(400).json(`Pas d'enregistrement avec ce ID : ${req.params.idNiveau}`);
    } else {
        Niveau.findByIdAndUpdate(
            req.params.idNiveau,{ 
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
        ).populate("specialite", "nom");
    }
});

//http://localhost:9091/Niveau/getNiveauByIdSpecialite/idSpecialite
niveauRouter.route("/getNiveauByIdSpecialite/:idSpecialite").get((req,res)=>{
    Niveau.find({specialite: req.params.idSpecialite},(err, niveau)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(niveau)
        }
    }).populate("specialite", "nom");
});

//http://localhost:9091/Niveau/getNiveauById/idNiveau
niveauRouter.route("/getNiveauById/:idNiveau").get((req,res)=>{
    Niveau.find({_id: req.params.idNiveau},(err, niveau)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(niveau)
        }
    }).populate("specialite", "nom");
});

//http://localhost:9091/Niveau/delete/idNiveau
niveauRouter.route("/delete/:idNiveau").delete((req, res) => {
  Niveau.findByIdAndDelete((req.params.idNiveau),(err, niveau) => {
    if(err){
      res.status(400).json(err);
    } else {
      Class.deleteMany({niveau: req.params.idNiveau}, (errr, classe) => {
        if(errr) {
          res.status(400).json(errr)
        } else {
          res.status(200).json(niveau);
        }
      });
    }
  });
});

//http://localhost:9091/Niveau/CountNiveauByIdSpecialite/id
niveauRouter.route("/CountNiveauByIdSpecialite/:idSpecialite").get((req, res) => {
    Niveau.count({specialite: req.params.idSpecialite},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Niveau/CountNiveau
niveauRouter.route("/CountNiveau").get((req, res) => {
    Niveau.count({},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            return res.status(200).json(number);
        }
    });
});
  
module.exports = niveauRouter;
