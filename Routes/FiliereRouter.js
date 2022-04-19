const express = require("express");
const filiereRouter = express.Router();
const Filiere = require("../Models/FiliereModel");
const User = require("../Models/UserModel");

filiereRouter
.route("/addFiliere/:id")
//http://localhost:9091/Filiere/addFiliere/id
.post((req, res) => {
    User.findById(req.params.id ,(err,user)=>{
        const filiere = new Filiere({
            nom: req.body.nom,
            user: req.params.id,
        });
        if(err){
            res.status(400)
        } else {
            filiere.save();
           return res.status(200).json(filiere)
        }
    })
    
});

filiereRouter
.route("/getFiliereByUniversiteId/:id")
//http://localhost:9091/Filiere/getFiliereByUniversiteId/id
.get((req,res)=>{
    Filiere.find({user: req.params.id},(err, filiere)=>{
        if(err){
            return res.sendStatus(401)
        } else {
            return res.status(200).json(filiere)
        }
    })
});

 filiereRouter
  .route("/CountFilier/:id")
  //http://localhost:9091/Filiere/CountFilier/id
  .get(async(req, res) => {
    Filiere.count({user: req.params.id},(err, number) => {
        if(err){
            res.sendStatus(400) 
        } else {
            return res.status(200).json(number);
        }
      
    });
  });

  
module.exports = filiereRouter;
