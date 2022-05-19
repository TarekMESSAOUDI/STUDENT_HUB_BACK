const express = require("express");
const classRouter = express.Router();
const Class = require("../Models/ClassModel");
const Niveau = require("../Models/NiveauModel");
const User = require("../Models/UserModel");
var ObjectId = require("mongoose").Types.ObjectId;

//http://localhost:9091/Class/getAll
classRouter.route("/getAll").get((req, res) => {
    Class.find({}, (err, classe)=> {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(classe);
        }
    }).populate("niveau");
});

//http://localhost:9091/Class/getClassById/idClass
classRouter.route("/getClassById/:idClass").get((req, res) => {
    Class.findById(req.params.idClass, (err, classe)=> {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(classe);
        }
    }).populate("niveau");
});

//http://localhost:9091/Class/addClass/idNiveau
classRouter.route("/addClass/:idNiveau").post((req, res) => {
    Niveau.findById(req.params.idNiveau ,(err,niveau)=>{
        if(err) {
            res.status(400).json(err);
        } else {
            const classe = new Class({
            nom: req.body.nom,
            niveau: req.params.idNiveau,
        });
        classe.save();
        res.status(200).json(classe)
        }
    });    
});

//http://localhost:9091/Class/getClassByNiveauId/idNiveau
classRouter.route("/getClassByNiveauId/:idNiveau").get((req,res)=>{
    Class.find({niveau: req.params.idNiveau},(err, classe)=>{
        if(err){
            return res.sendStatus(400)
        } else {
            return res.status(200).json(classe)
        }
    }).populate("niveau");
});

//http://localhost:9091/Class/CountClassByNiveauId/idNiveau
classRouter.route("/CountClassByNiveauId/:idNiveau").get(async(req, res) => {
    Class.count({niveau: req.params.idNiveau},(err, number) => {
        if(err){
            res.status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});
  
//http://localhost:9091/Class/CountClass
classRouter.route("/CountClass").get(async(req, res) => {
    Class.count({},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Class/Update/idClass
classRouter.route("/Update/:idClass").put((req, res) => {
    if (!ObjectId.isValid(req.params.idClass)){
        return res.status(400).json(`Pas d'enregistrement avec ce ID : ${req.params.idClass}`);
    } else {
        Class.findByIdAndUpdate(
            req.params.idClass,{ 
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
        ).populate("niveau");
    }
});

//http://localhost:9091/Class/delete/idClass
classRouter.route("/delete/:idClass").delete((req, res) => {
  Class.findByIdAndDelete((req.params.idClass),(err, classe) => {
    if(err){
      res.status(400).json(err);
    } else {
      User.deleteMany({class: req.params.idClass}, (errr, user) => {
        if(errr) {
          res.status(400).json(errr)
        } else {
          res.status(200).json(classe);
        }
      });
    }
  });
});


module.exports = classRouter;
