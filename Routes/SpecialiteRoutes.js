const express = require("express");
const specialiteRouter = express.Router();
const Specialite = require("../Models/SpecialiteModel");
const Filiere = require("../Models/FiliereModel");

specialiteRouter
.route("/addSpecialite/:id")
//http://localhost:9091/Specialite/addSpecialite/id
.post((req, res) => {
    Filiere.findById(req.params.id ,(err,filiere)=>{
        const specialite = new Specialite({
            nom: req.body.nom,
            acro: req.body.acro,
            filiere: req.params.id,
        });
        if(err){
            res.status(400)
        } else {
            specialite.save();
           return res.status(200).json(specialite)
        }
    })
    
});

specialiteRouter
.route("/getSpecialiteByFiliereId/:id")
//http://localhost:9091/Specialite/getSpecialiteByFiliereId/id
.get((req,res)=>{
    Specialite.find({filiere: req.params.id},(err, specialite)=>{
        if(err){
            return res.sendStatus(401)
        } else {
            return res.status(200).json(specialite)
        }
    }).populate("filiere")
});

 specialiteRouter
  .route("/CountSpecialite/:id")
  //http://localhost:9091/Specialite/CountSpecialite/id
  .get(async(req, res) => {
    Specialite.count({filiere: req.params.id},(err, number) => {
        if(err){
            res.sendStatus(400) 
        } else {
            return res.status(200).json(number);
        }
      
    });
  });

  
module.exports = specialiteRouter;
