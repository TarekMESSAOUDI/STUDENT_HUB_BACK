const express = require("express");
const noteRouter = express.Router();
const Note = require("../Models/NoteModel");
const User = require("../Models/UserModel");

//http://localhost:9091/Note/addNote/idUser
noteRouter.route("/addNote/:idUser").post((req, res) => {
    User.findById(req.params.idUser ,async(err,user)=>{
    const note = new Note({
      title: req.body.title + " : " + req.body.description,
      start: req.body.start,
      end: req.body.end,
      description :req.body.description,
      user: req.params.idUser,
    });
    if(err){
      res.status(401)
    } else {
      note.save();
      res.status(200).json(note)
    }
  });
});

//http://localhost:9091/Note/getNoteById/idUser
noteRouter.route("/getNoteById/:idUser").get((req, res) => {
  Note.find({user: req.params.idUser}, (err, note) => {
    if (err) {
      res.status(401).json(err);
    } else {
      res.status(200).json(note);
    }
  }).populate("user", "nom prenom -_id");
});

//http://localhost:9091/Note/deleteNote/idNote
noteRouter.route("/deleteNote/:idNote").delete((req, res) => {
  Note.findByIdAndDelete((req.params.idNote),(err, note) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json("Note Deleted Succefully");
    }
  });
});

module.exports = noteRouter;