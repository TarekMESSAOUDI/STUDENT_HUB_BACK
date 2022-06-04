const express = require("express");
const periodeRouter = express.Router();
const Periode = require("../Models/PeriodeModel");
const User = require("../Models/UserModel");

//http://localhost:9091/Periode/AddPeriode/idUniversite
periodeRouter.route("/AddPeriode/:idUniversite").post((req, res) => {
  User.findById(req.params.idUniversite ,(err,user)=>{
    const periode = new Periode({
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
      universite: req.params.idUniversite,
    });
    if(err){
      res.status(400)
    } else {
      periode.save();
      return res.status(200).json(periode)
    }
  });
});

//http://localhost:9091/Periode/getByUniversiteId/idUniversite
periodeRouter.route("/getByUniversiteId/:idUniversite").get((req, res) => {
  Periode.find({universite: req.params.idUniversite}, (err, periode) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(periode);
    }
  }).populate("universite", "nom prenom profileImage").sort("start");
});


//http://localhost:9091/Periode/delete/idPeriode
periodeRouter.route("/delete/:idPeriode").delete((req, res) => {
  Periode.findByIdAndDelete((req.params.idPeriode),(err, periode) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(periode);
    }
  });
});

module.exports = periodeRouter;