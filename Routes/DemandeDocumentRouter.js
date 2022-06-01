const express = require("express");
const demandeDocumentRouter = express.Router();
const DemandeDocument = require("../Models/DemandeDocumentModel");
const User = require("../Models/UserModel");
const nodemailer = require("nodemailer");


//http://localhost:9091/DemandeDocument/getByUniversite/idUniversite
demandeDocumentRouter.route("/getByUniversite/:idUniversite").get((req, res) => {
  DemandeDocument.find({universite: req.params.idUniversite}, (err, demande) => {
    if (err) {
      console.log(err)
      res.status(400).json(err);
    } else {
      res.status(200).json(demande);
    }
  }).populate("user", "-mdp -confirmMdp");
});

//http://localhost:9091/DemandeDocument/getByIdUser/idUser
demandeDocumentRouter.route("/getByIdUser/:idUser").get((req, res) => {
  DemandeDocument.find({user: req.params.idUser}, (err, demande) => {
    if (err) {
      console.log(err)
      res.status(400).json(err);
    } else {
      res.status(200).json(demande);
    }
  }).populate("user", "-mdp -confirmMdp");
});

//http://localhost:9091/DemandeDocument/addDemande/idUser
demandeDocumentRouter.route("/addDemande/:idUser").post(async(req, res) => {
  const user = await User.findById(req.params.idUser);
    const demande = new DemandeDocument({
      type: req.body.type,
      raison: req.body.raison,
      user: req.params.idUser,
      universite: user.institut
    });
    if(!user){
      res.status(400)
    } else {
      demande.save();
      return res.status(200).json(demande)
    }
  });


//http://localhost:9091/DemandeDocument/Ready/idDemande
demandeDocumentRouter.route("/Ready/:idDemande").put(async(req, res) => {
  DemandeDocument.findById(req.params.idDemande,async (err, demande)=>{
    if(err){
      res.status(400).json(err)
    } else {
      demande.etat = "Ready";
      demande.save();
      const user =await User.findById(demande.user);
      console.log(user)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: "tarek.messaoudi@esprit.tn",
        pass: "curvanord193JMT5213",
        },
      });
      const mailOptions = {
        from: "tarek.messaoudi@esprit.tn",
        to: user.email,
        subject: "Document Ready !",
        text: "Your " + demande.type + " is ready"
      }
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log("Email sent : " + info.response);
          res.status(200).json(mailOptions);
        }
      });
    }
  });
});


module.exports = demandeDocumentRouter;