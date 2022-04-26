const express = require("express");
const specialiteRouter = express.Router();
const Specialite = require("../Models/SpecialiteModel");
const Filiere = require("../Models/FiliereModel");
const Niveau = require("../Models/NiveauModel");
var ObjectId = require("mongoose").Types.ObjectId;

//http://localhost:9091/Specialite/addSpecialite/idFiliere
specialiteRouter.route("/addSpecialite/:idFiliere").post((req, res) => {
    Filiere.findById(req.params.idFiliere ,(err,filiere)=>{
        const specialite = new Specialite({
            nom: req.body.nom,
            acro: req.body.acro,
            filiere: req.params.idFiliere,
        });
        if(err){
            res.status(400).json(err);
        } else {
            specialite.save();
            res.status(200).json(specialite);
        }
    });
});

//http://localhost:9091/Specialite/getAll
specialiteRouter.route("/getAll").get((req,res)=>{
    Specialite.find({},(err, specialite)=>{
        if(err){
            return res.sendStatus(400).json(err);
        } else {
            return res.status(200).json(specialite)
        }
    }).populate("filiere", "nom");
});

//http://localhost:9091/Specialite/Update/idSpecialite
specialiteRouter.route("/Update/:idSpecialite").put((req, res) => {
    if (!ObjectId.isValid(req.params.idSpecialite)){
        return res.status(400).json(`Pas d'enregistrement avec ce ID : ${req.params.idSpecialite}`);
    } else {
        Specialite.findByIdAndUpdate(
            req.params.idSpecialite,{ 
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
        ).populate("filiere", "nom");
    }
});

//http://localhost:9091/Specialite/getSpecialiteByFiliereId/idFiliere
specialiteRouter.route("/getSpecialiteByFiliereId/:idFiliere").get((req,res)=>{
    Specialite.find({filiere: req.params.idFiliere},(err, specialite)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(specialite)
        }
    }).populate("filiere", "nom");
});

//http://localhost:9091/Specialite/getSpecialiteById/idSpecialite
specialiteRouter.route("/getSpecialiteById/:idSpecialite").get((req,res)=>{
    Specialite.find({_id: req.params.idSpecialite},(err, specialite)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(specialite)
        }
    }).populate("filiere", "nom");
});

//http://localhost:9091/Specialite/CountSpecialiteByIdFiliere/idFiliere
specialiteRouter.route("/CountSpecialiteByIdFiliere/:idFiliere").get((req, res) => {
    Specialite.count({filiere: req.params.idFiliere},(err, number) => {
        if(err){
            res.sendStatus(400).json(err); 
        } else {
            return res.status(200).json(number);
        }
    }).populate("filiere", "nom");
});

//http://localhost:9091/Specialite/CountSpecialite
specialiteRouter.route("/CountSpecialite").get((req, res) => {
    Specialite.count({},(err, number) => {
        if(err){
            res.sendStatus(400).json(err);  
        } else {
            return res.status(200).json(number);
        }
    }).populate("filiere", "nom");
});

//http://localhost:9091/Specialite/delete/idSpecialite
specialiteRouter.route("/delete/:idSpecialite").delete((req, res) => {
  Specialite.findByIdAndDelete((req.params.idSpecialite),(err, specialite) => {
    if(err){
      res.status(400).json(err);
    } else {
      Niveau.deleteMany({specialite: req.params.idSpecialite}, (errr, niveau) => {
        if(errr) {
          res.status(400).json(errr)
        } else {
          res.status(200).json(specialite);
        }
      });
    }
  });
});
  
module.exports = specialiteRouter;
