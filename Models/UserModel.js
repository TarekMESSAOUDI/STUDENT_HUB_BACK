const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SEX = require("./SexModel");

const userModel = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  titre: { type: String },
  email: { type: String },
  tel: { type: String },
  cin: { type: String, required: true },
  paye: { type: String },
  ville: { type: String },
  rue: { type: String },
  codePostal: { type: Number },
  dateNaissance: { type: String, default: new Date().toLocaleDateString() },
  mdp: { type: String, default: new Date().toLocaleDateString() },
  confirmMdp: { type: String ,default: new Date().toLocaleDateString() },
  desactiver: { type: Boolean, default: false },
  accessToken: [{ type: String, default: "" }],
  disponibilite: { type: String },
  rang: { type: Number },
  profileImage: { type: String, default: "PROFILE.jpeg" },
  coverImage: { type: String, default: "COVER.jpeg" },
  institutImage: { type: String, default: "ESEN.jpeg" },
  bio: { type: String },
  softSkills: { type: String },
  sex: {type: String, default: "NOt_SPECIFIED",},
  institut: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  class: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  filiere:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Filiere",
  },
  skills: [
    { type: String },
  ],
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

module.exports = mongoose.model("User", userModel);
