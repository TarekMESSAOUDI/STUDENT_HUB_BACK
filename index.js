const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 9091;
const userRouter = require("./Routes/UserRouter");
const blogRouter = require("./Routes/BlogRouter");
const commentaireRouter = require("./Routes/CommentaireRouter");
const emploisRouter = require("./Routes/EmploisRouter");
const tacheRouter = require("./Routes/TacheRouter");
const contactRouter = require("./Routes/ContactRouter");
const roleRouter = require("./Routes/RoleRouter");
const Role = require("./Models/RoleModel");
const User = require("./Models/UserModel");
var bcrypt = require("bcryptjs");
mongoose
  .connect("mongodb://localhost:27017/StudentHub", { useNewUrlParser: true })
  .then(() => {
    initialeRole();
    initialeUser();
  });
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("Images"));

app.get("/", (req, res) => {
  res.send("Hello Student Hub");
});
app.use("/User", userRouter);
app.use("/Blog", blogRouter);
app.use("/Commentaire", commentaireRouter);
app.use("/Emplois", emploisRouter);
app.use("/Tache", tacheRouter);
app.use("/Contact", contactRouter);
app.use("/Role", roleRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

function initialeRole() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        nom: "ADMINISTRATEUR",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Role ADMINISTRATEUR Ajouté");
      });
      new Role({
        nom: "UNIVERSITE",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Role UNIVERSITE Ajouté");
      });
      new Role({
        nom: "ENSEIGNANT",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Role ENSEIGNANT Ajouté");
      });
      new Role({
        nom: "ETUDIANT",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Role ETUDIANT Ajouté");
      });
      new Role({
        nom: "CLUB",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Role CLUB Ajouté");
      });
    }
  });
}

function initialeUser() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        nom: "Admin",
        prenom: "Admin",
        titre: "Admin",
        email: "Admin",
        tel: "Admin",
        cin: "Admin",
        ville: "Admin",
        rue: "Admin",
        codePostale: "Admin",
        dateNaissance: new Date(),
        mdp: bcrypt.hashSync("Admin", 8),
        confirmMdp: bcrypt.hashSync("Admin", 8),
        desactiver: false,
        resettoken: "Admin",
        disponibilite: "Admin",
        rang: 0,
        profileImage: "Admin",
        coverImage: "Admin",
        institutImage: "Admin",
        institut: "Admin",
        specialite: "Admin",
        bio: "Admin",
        skills1: "Admin",
        skills2: "Admin",
        skills3: "Admin",
        skills4: "Admin",
        softSkills: "Admin",
        paye: "Admin",
        sex: "Admin",
        roles: "625030dd9f3bad7d78d0d481",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("ADMINISTRATEUR Ajouté");
      });
    }
  });
}
