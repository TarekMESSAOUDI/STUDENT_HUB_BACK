const express = require("express");
const classRouter = express.Router();
const Class = require("../Models/ClassModel");
const Niveau = require("../Models/NiveauModel");

classRouter
.route("/addClass/:id")
//http://localhost:9091/Class/addClass/id
.post((req, res) => {
    Niveau.findById(req.params.id ,(err,niveau)=>{
        const classe = new Class({
            nom: req.body.nom,
            niveau: req.params.id,
        });
        if(err){
            res.status(400)
        } else {
            classe.save();
           return res.status(200).json(classe)
        }
    })
    
});

classRouter
.route("/getClassByNiveauId/:id")
//http://localhost:9091/Class/getClassByNiveauId/id
.get((req,res)=>{
    Class.find({niveau: req.params.id},(err, classe)=>{
        if(err){
            return res.sendStatus(401)
        } else {
            return res.status(200).json(classe)
        }
    }).populate("niveau");
});

 classRouter
  .route("/CountClass/:id")
  //http://localhost:9091/Class/CountClass/id
  .get(async(req, res) => {
    Class.count({niveau: req.params.id},(err, number) => {
        if(err){
            res.sendStatus(400) 
        } else {
            return res.status(200).json(number);
        }
      
    });
  });

  
module.exports = classRouter;
