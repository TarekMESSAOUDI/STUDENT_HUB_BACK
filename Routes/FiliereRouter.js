const express = require("express");
const filiereRouter = express.Router();
const Filiere = require("../Models/FiliereModel");
const User = require("../Models/UserModel");
const Specialite = require("../Models/SpecialiteModel");
var ObjectId = require("mongoose").Types.ObjectId;

//http://localhost:9091/Filiere/getAll
filiereRouter.route("/getAll").get((req, res) => {
    Filiere.find({}, (err, filier) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(filier)
        }
    }).populate("user", "nom prenom roles");
});

//http://localhost:9091/Filiere/addFiliere/idUser
filiereRouter.route("/addFiliere/:idUser").post((req, res) => {
    User.findById(req.params.idUser ,(err,user)=>{
        const filiere = new Filiere({
            nom: req.body.nom,
            user: req.params.idUser,
        });
        if(err){
            res.status(400).json(err);
            console.log(err);
        } else {
            filiere.save();
            res.status(200).json(filiere)
        }
    });
});

//http://localhost:9091/Filiere/getFiliereByUniversiteId/idUser
filiereRouter.route("/getFiliereByUniversiteId/:idUser").get((req,res)=>{
    Filiere.find({user: req.params.idUser},(err, filiere)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(filiere)
        }
    }).populate("user", "nom prenom roles");
});

//http://localhost:9091/Filiere/getFiliereById/idFiliere
filiereRouter.route("/getFiliereById/:idFiliere").get((req,res)=>{
    Filiere.find({_id: req.params.idFiliere},(err, filiere)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(filiere)
        }
    }).populate("user", "nom prenom roles");
});

//http://localhost:9091/Filiere/CountFilierByUniversiteId/idUniversite
filiereRouter.route("/CountFilierByUniversiteId/:idUniversite").get(async(req, res) => {
    Filiere.count({user: req.params.idUniversite},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(number);
        } 
    });
});

//http://localhost:9091/Filiere/delete/idFiliere
filiereRouter.route("/delete/:idFiliere").delete((req, res) => {
  Filiere.findByIdAndDelete((req.params.idFiliere),(err, filiere) => {
    if(err){
      res.status(400).json(err);
    } else {
      Specialite.deleteMany({filiere: req.params.idFiliere}, (errr, specialite) => {
        if(errr) {
          res.status(400).json(errr)
        } else {
          res.status(200).json(filiere);
        }
      });
    }
  });
});

//http://localhost:9091/Filiere/CountFilier
filiereRouter.route("/CountFilier").get(async(req, res) => {
    Filiere.count({},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(number);
        } 
    });
});

//http://localhost:9091/Filiere/Update/idFiliere
filiereRouter.route("/Update/:idFiliere").put((req, res) => {
    if (!ObjectId.isValid(req.params.idFiliere)){
        return res.status(400).json(`Pas d'enregistrement avec ce ID : ${req.params.idFiliere}`);
    } else {
        Filiere.findByIdAndUpdate(
            req.params.idFiliere,{ 
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
        ).populate("user", "nom prenom roles");
    }
});

  
module.exports = filiereRouter;
