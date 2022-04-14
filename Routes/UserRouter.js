const express = require("express");
const userRouter = express.Router();
const User = require("../Models/UserModel");
const Role = require("../Models/RoleModel");
const multer = require("multer");
var ObjectId = require("mongoose").Types.ObjectId;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images/User/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("le fichier doit etre jpeg, jpg ou png"), null, false);
  }
};

const image = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

userRouter
  .route("/signupEtudiant")
  //http://localhost:9091/User/signup
  .post((req, res) => {
    const user = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      titre: req.body.titre,
      tel: req.body.tel,
      cin: req.body.cin,
      email: req.body.email,
      dateNaissance: req.body.dateNaissance,
      mdp: bcrypt.hashSync(req.body.mdp, 8),
      confirmMDP: bcrypt.hashSync(req.body.confirmMDP),
      ville: req.body.ville,
      rue: req.body.rue,
      codePostal: req.body.codePostal,
      desactiver: req.body.desactiver,
      disponibilite: req.body.disponibilite,
      rang: req.body.rang,
      profileImage: req.body.profileImage,
      coverImage: req.body.coverImage,
      institutImage: req.body.institutImage,
      institut: req.body.institut,
      specialite: req.body.specialite,
      bio: req.body.bio,
      skills1: req.body.skills1,
      skills2: req.body.skills2,
      skills3: req.body.skills3,
      skills4: req.body.skills4,
      softSkills: req.body.softSkills,
      paye: req.body.paye,
      sex: req.body.sex,
    });
    User.findOne({ cin: req.body.cin }).exec((err, u) => {
      if (u) {
        res.status(400).send({ message: "Echec! CIN exist déja!" });
        return;
      } else {
        user.save((err, u) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (req.body.roles) {
            Role.find({ nom: { $in: req.body.roles } }, (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              user.roles = roles.map((role) => role._id);
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({ message: "Utilisateur Enregistré Avec Succes!" });
              });
            });
          } else {
            Role.findOne({ nom: "ETUDIANT" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              user.roles = [role._id];
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({ message: "Utilisateur Enregistré Avec Succes!" });
              });
            });
          }
        });
      }
    });
  });

userRouter
  .route("/signupEnseignat")
  //http://localhost:9091/User/signup
  .post((req, res) => {
    const user = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      titre: req.body.titre,
      tel: req.body.tel,
      cin: req.body.cin,
      email: req.body.email,
      dateNaissance: req.body.dateNaissance,
      mdp: bcrypt.hashSync(req.body.mdp, 8),
      confirmMDP: bcrypt.hashSync(req.body.confirmMDP),
      ville: req.body.ville,
      rue: req.body.rue,
      codePostal: req.body.codePostal,
      desactiver: req.body.desactiver,
      disponibilite: req.body.disponibilite,
      rang: req.body.rang,
      profileImage: req.body.profileImage,
      coverImage: req.body.coverImage,
      institutImage: req.body.institutImage,
      institut: req.body.institut,
      specialite: req.body.specialite,
      bio: req.body.bio,
      skills1: req.body.skills1,
      skills2: req.body.skills2,
      skills3: req.body.skills3,
      skills4: req.body.skills4,
      softSkills: req.body.softSkills,
      paye: req.body.paye,
      sex: req.body.sex,
    });
    User.findOne({ cin: req.body.cin }).exec((err, u) => {
      if (u) {
        res.status(400).send({ message: "Echec! CIN exist déja!" });
        return;
      } else {
        user.save((err, u) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (req.body.roles) {
            Role.find({ nom: { $in: req.body.roles } }, (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              user.roles = roles.map((role) => role._id);
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({ message: "Utilisateur Enregistré Avec Succes!" });
              });
            });
          } else {
            Role.findOne({ nom: "ENSEIGNANT" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              user.roles = [role._id];
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({ message: "Utilisateur Enregistré Avec Succes!" });
              });
            });
          }
        });
      }
    });
  });

userRouter
  .route("/signupUniversite")
  //http://localhost:9091/User/signup
  .post((req, res) => {
    const user = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      titre: req.body.titre,
      tel: req.body.tel,
      cin: req.body.cin,
      email: req.body.email,
      dateNaissance: req.body.dateNaissance,
      mdp: bcrypt.hashSync(req.body.mdp, 8),
      confirmMDP: bcrypt.hashSync(req.body.confirmMDP),
      ville: req.body.ville,
      rue: req.body.rue,
      codePostal: req.body.codePostal,
      desactiver: req.body.desactiver,
      disponibilite: req.body.disponibilite,
      rang: req.body.rang,
      profileImage: req.body.profileImage,
      coverImage: req.body.coverImage,
      institutImage: req.body.institutImage,
      institut: req.body.institut,
      specialite: req.body.specialite,
      bio: req.body.bio,
      skills1: req.body.skills1,
      skills2: req.body.skills2,
      skills3: req.body.skills3,
      skills4: req.body.skills4,
      softSkills: req.body.softSkills,
      paye: req.body.paye,
      sex: req.body.sex,
    });
    User.findOne({ cin: req.body.cin }).exec((err, u) => {
      if (u) {
        res.status(400).send({ message: "Echec! CIN exist déja!" });
        return;
      } else {
        user.save((err, u) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (req.body.roles) {
            Role.find({ nom: { $in: req.body.roles } }, (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              user.roles = roles.map((role) => role._id);
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({
                  message: "Utilisateur Enregistré Avec Succes!",
                });
              });
            });
          } else {
            Role.findOne({ nom: "UNIVERSITE" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              user.roles = [role._id];
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({
                  message: "Utilisateur Enregistré Avec Succes!",
                });
              });
            });
          }
        });
      }
    });
  });

userRouter
  .route("/signin")
  //http://localhost:9091/User/signin
  .post((req, res) => {
    User.findOne({
      cin: req.body.cin,
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user || user.desactiver === true) {
          return res.status(404).send({ message: "User N'exist pas." });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.mdp, user.mdp);
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 864000, // 240 hours
        });

        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push(user.roles);
        }
        user.authtoken = token;
        res.status(200).send({
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          titre: user.titre,
          tel: user.tel,
          cin: user.cin,
          dateNaissance: user.dateNaissance,
          email: user.email,
          ville: user.ville,
          rue: user.rue,
          codePostal: user.codePostal,
          desactiver: user.desactiver,
          disponibilite: user.disponibilite,
          rang: user.rang,
          profileImage: user.profileImage,
          coverImage: user.coverImage,
          institutImage: user.institutImage,
          institut: user.institut,
          specialite: user.specialite,
          bio: user.bio,
          skills1: user.skills1,
          skills2: user.skills2,
          skills3: user.skills3,
          skills4: user.skills4,
          softSkills: user.softSkills,
          paye: user.paye,
          sex: user.sex,
          roles: authorities,
          accessToken: token,
        });
      });
  });

userRouter
  .route("/updateMDP/:id")
  //http://localhost:9091/User/updateMDP
  .put((req, res) => {
    User.findById(req.params.id, async (err, user) => {
      var passwordIsValid = bcrypt.compareSync(req.body.aMdp, user.mdp);
      var cNMdp = bcrypt.hashSync(req.body.cNMdp, 8);
      var confirmmdpIsValid = bcrypt.compareSync(req.body.nMdp, cNMdp);
      if (!user || !passwordIsValid || !confirmmdpIsValid) {
        return res.sendStatus(400);
      } else {
        await (user.mdp = bcrypt.hashSync(req.body.cNMdp, 8));
        await (user.confirmMDP = bcrypt.hashSync(req.body.cNMdp, 8));
        await user.save();
        res.sendStatus(200).json;
      }
    });
  });

userRouter
  .route("/updateMDPa")
  //http://localhost:9091/User/updateMDP

  .put((req, res) => {
    User.findOne({ cin: req.body.cin }, (err, user) => {
      if (req.body.nMdp != req.body.cNMdp || !user) {
        return res.sendStatus(400);
      } else {
        nMdp = req.body.nMdp;
        user.mdp = bcrypt.hashSync(nMdp, 8);
        user.save();
        res.sendStatus(200);
      }
    });
  });

userRouter
  .route("/getAll")
  //http://localhost:9091/User/getAll
  .get((req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.send(400).json(err);
      } else {
        res.json(users);
      }
    }).populate("roles", "-__v");
  });

userRouter
  .route("/Count")
  //http://localhost:9091/User/Count
  .get((req, res) => {
    User.count({}, (err, n) => {
      if (err) {
        res.send(400).json(err);
      } else {
        res.json(n);
      }
    });
  });

userRouter
  .route("/getById/:id")
  //http://localhost:9091/User/getById/id
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.sendStatus(400).json(err);
      } else {
        res.json(user);
      }
    }).populate("roles", "-__v");
  });

userRouter
  .route("/delete/:id")
  //http://localhost:9091/User/delete/id
  .delete((req, res) => {
    User.findById(req.params.id, (err, user) => {
      user.delete((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send("Supprimé Avec Succes :)");
        }
      });
    });
  });

userRouter
  .route("/update/:id")
  //http://localhost:9091/User/update/id
  .put((req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .send(`Pas d'enregistrement avec ce ID : ${req.params.id}`);
    User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log(
            "Error in User Update :" + JSON.stringify(err, undefined, 2)
          );
        }
      }
    ).populate("roles", "-__v");
  });

userRouter
  .route("/getAllUniversities")
  //http://localhost:9091/User/getAllUniversities
  .get(async (req, res) => {
    let u = await Role.find({ nom: "UNIVERSITE" });
    User.find({ roles: u }, (err, universities) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(universities);
      }
    }).populate("roles", "-__v");
  });

userRouter
  .route("/getAllEtudiant")
  //http://localhost:9091/User/getAllEtudiant
  .get(async (req, res) => {
    let e = await Role.find({ nom: "ETUDIANT" });
    User.find({ roles: e }, (err, etudiants) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(etudiants);
      }
    }).populate("roles", "-__v");
  });

userRouter
  .route("/Image/profile/:id")
  //http://localhost:9091/User/Image/profile/id
  .put(image.single("profileImage"), (req, res) => {
    User.findById(req.params.id, (err, user) => {
      user.profileImage = req.file.originalname;
      user.save();
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(user);
      }
    });
  });

userRouter
  .route("/Image/cover/:id")
  //http://localhost:9091/User/Image/cover/id
  .put(image.single("coverImage"), (req, res) => {
    User.findById(req.params.id, (err, user) => {
      user.coverImage = req.file.originalname;
      user.save();
      if (err) {
        res.sendStatus(400).json(err);
        console.log(err);
      } else {
        res.json(user);
      }
    }).populate("roles", "-__v");
  });

userRouter
  .route("/Image/institut/:id")
  //http://localhost:9091/User/Image/institut/id
  .put(image.single("institutImage"), (req, res) => {
    User.findById(req.params.id, (err, user) => {
      user.institutImage = req.file.originalname;
      user.save();
      if (err) {
        res.sendStatus(400).json(err);
        console.log(err);
      } else {
        res.json(user);
      }
    }).populate("roles", "-__v");
  });

//Enseigant
userRouter
  .route("/getAllEnseignant")
  //http://localhost:9091/User/Enseigant/getAll
  .get(async (req, res) => {
    let en = await Role.find({ nom: "ENSEIGNANT" });
    User.find({ roles: en }, (err, enseignants) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(enseignants);
      }
    });
  });

//Club
userRouter
  .route("/getAllClub")
  //http://localhost:9091/User/Club/getAll
  .get((req, res) => {
    User.find({ role: "CLUB" }, (err, club) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(club);
      }
    });
  });

module.exports = userRouter;
