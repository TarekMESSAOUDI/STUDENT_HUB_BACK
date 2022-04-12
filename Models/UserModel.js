const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SEX = require("./SexModel");

let userModel = new Schema({
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
  profileImage: { type: String, default: "ProfilePikoro.jpeg" },
  coverImage: { type: String, default: "coverPikoro.jpeg" },
  institutImage: { type: String, default: "profilePikoro.jpeg" },
  institut: { type: String },
  specialite: { type: String },
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
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

module.exports = mongoose.model("Users", userModel);
