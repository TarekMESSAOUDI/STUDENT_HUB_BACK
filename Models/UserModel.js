const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SEX = require("./SexModel");

const userModel = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String },
  titre: { type: String },
  email: { type: String },
  tel: { type: String },
  cin: { type: String, required: true },
  ville: { type: String },
  rue: { type: String },
  codePostal: { type: Number },
  dateNaissance: { type: Date, required: true, default: new Date() },
  mdp: { type: String, default: new Date() },
  confirmMdp: { type: String },
  desactiver: { type: Boolean, default: 0 },
  accessToken: [{ type: String, default: "" }],
  disponibilite: { type: String },
  rang: { type: Number },
  profileImage: { type: String, default: "PROFILE.jpeg" },
  coverImage: { type: String, default: "COVER.jpeg" },
  institutImage: { type: String, default: "ESEN.jpeg" },
  institut: { type: String },
  bio: { type: String },
  skills1: { type: String },
  skills2: { type: String },
  skills3: { type: String },
  skills4: { type: String },
  softSkills: { type: String },
  paye: { type: String },
  sex: {
    type: SEX,
    ref: "Sex",
  },
  class: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  filiere:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Filiere",
  },
  /*specialite:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialite",
    default: "Tron_Commun"
  },
  niveau:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niveau",
    default: "No_Level"
  },*/
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

module.exports = mongoose.model("User", userModel);
