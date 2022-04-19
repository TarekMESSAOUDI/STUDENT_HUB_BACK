const express = require("express");
const niveauRouter = express.Router();
const Niveau = require("../Models/NiveauModel");
const Specialite = require("../Models/SpecialiteModel");

niveauRouter
.route("/addNiveau/:id")
//http://localhost:9091/Niveau/addNiveau/id
.post((req, res) => {
    Specialite.findById(req.params.id ,(err,specialite)=>{
        const niveau = new Niveau({
            nom: req.body.nom,
            specialite: req.params.id,
        });
        if(err){
            res.status(400)
        } else {
            niveau.save();
           return res.status(200).json(niveau)
        }
    })
    
});

niveauRouter
.route("/getNiveauByIdSpecialite/:id")
//http://localhost:9091/Niveau/getNiveauByIdSpecialite/id
.get((req,res)=>{
    Niveau.find({specialite: req.params.id},(err, niveau)=>{
        if(err){
            return res.sendStatus(401)
        } else {
            return res.status(200).json(niveau)
        }
    }).populate("specialite")
});

 niveauRouter
  .route("/CountNiveau/:id")
  //http://localhost:9091/Niveau/CountNiveau/id
  .get(async(req, res) => {
    Niveau.count({specialite: req.params.id},(err, number) => {
        if(err){
            res.sendStatus(400) 
        } else {
            return res.status(200).json(number);
        }
      
    });
  });

  
module.exports = niveauRouter;
