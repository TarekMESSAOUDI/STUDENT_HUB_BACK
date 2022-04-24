const express = require("express");
const userRouter = express.Router();
const User = require("../Models/UserModel");
const Role = require("../Models/RoleModel");
const multer = require("multer");
var ObjectId = require("mongoose").Types.ObjectId;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/////////////////////////////////IMAGE////////////////////////////////
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

//http://localhost:9091/User/Image/profile/idUser
userRouter.route("/Image/profile/:idUser").put(image.single("profileImage"), (req, res) => {
  User.findById(req.params.idUser, (err, user) => {
    user.profileImage = req.file.originalname;
    user.save();
    if (err) {
      res.sendStatus(400);
    } else {
      res.json(user);
    }
  });
});

//http://localhost:9091/User/Image/cover/idUser
userRouter.route("/Image/cover/:idUser").put(image.single("coverImage"), (req, res) => {
  User.findById(req.params.idUser, (err, user) => {
    user.coverImage = req.file.originalname;
    user.save();
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(user);
    }
  });
});

//http://localhost:9091/User/Image/institut/idUser
userRouter.route("/Image/institut/:idUser").put(image.single("institutImage"), (req, res) => {
  User.findById(req.params.idUser, (err, user) => {
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

///////////////////////////////////////USER/////////////////////////////////

//http://localhost:9091/User/signin
userRouter.route("/signin").post((req, res) => {
  User.findOne({
    cin: req.body.cin,
  }).populate("roles", "-__v").populate("institut").populate("class").exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user || user.desactiver === true) {
      return res.status(404).send({ message: "User Not Found." });
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
      roles: authorities,
      accessToken: token,
      profileImage: user.profileImage,
      class: user.class,
      institut: user.institut,
    });    
  });
});

//http://localhost:9091/User/updateMDP
userRouter.route("/updateMDP/:id").put((req, res) => {
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
      res.sendStatus(200);
    }
  });
});

//http://localhost:9091/User/forgotPassword
userRouter.route("/forgotPassword").put((req, res) => {
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

//http://localhost:9091/User/getAll
userRouter.route("/getAll").get((req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(400).json(err);
    } else {
      res.json(users);
    }
  }).populate("roles", "-__v").populate("class", "nom").populate("institut", "nom");
});

//http://localhost:9091/User/getById/idUser
userRouter.route("/getById/:idUser").get((req, res) => {
  User.findById(req.params.idUser, (err, user) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(user);
    }
  }).populate("roles", "-__v").populate("class", "nom").populate("institut", "nom");
});

//http://localhost:9091/User/delete/idUser
userRouter.route("/delete/:idUser").delete((req, res) => {
  User.findByIdAndDelete((req.params.idUser), (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      User.deleteMany({institut: req.params.idUser}, (errr, userr) => {
        if(errr) {
          res.status(400).json(errr);
        } else {
          res.status(200).json("Supprimé Avec Succes :)");
        }
      });  
    }
  });
});

//http://localhost:9091/User/update/idUser
userRouter.route("/update/:idUser").put((req, res) => {
  if (!ObjectId.isValid(req.params.idUser))
    return res.status(400).send(`Pas d'enregistrement avec ce ID : ${req.params.idUser}`);
    User.findByIdAndUpdate(req.params.idUser,{ $set: req.body },{ new: true },(err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log("Error in User Update :" + JSON.stringify(err, undefined, 2));
      }
    }
  ).populate("roles", "-__v").populate("class", "nom").populate("institut", "nom");
});

//http://localhost:9091/User/Count
userRouter.route("/Count").get(async(req, res) => {
  User.count({},(err, number) => {
    res.json(number);
    return number;
  });
});

//////////////////////////////////////ADMIN////////////////////////////////

//http://localhost:9091/User/signupAdmin
userRouter.route("/signupAdmin").post((req, res) => {
  const admin = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    cin: req.body.cin,
    dateNaissance: req.body.dateNaissance,
    mdp: bcrypt.hashSync(req.body.dateNaissance, 8),
    confirmMdp: bcrypt.hashSync(req.body.dateNaissance, 8),
  });
  User.findOne({ cin: req.body.cin }).exec((err, user) => {
    if (user) {
      res.status(400).json({ message: "Faild! CIN Alredy In Use !" });
      return;
    } else {
      admin.save((err, user) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        Role.findOne({ nom: "ADMINISTRATEUR" }, (err, role) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          admin.roles = [role._id];
          admin.save((err) => {
            if (err) {
              res.status(500).json({ message: err });
              return;
            }
            res.status(200).json(admin);
          });
        });
      });
    }
  });
});

//http://localhost:9091/User/getAllAdmin
userRouter.route("/getAllAdmin").get(async (req, res) => {
  let admin = await Role.find({ nom: "ADMINISTRATEUR" });
  User.find({ roles: admin }, (err, admins) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(admins);
    }
  }).populate("roles", "-__v");
});

//http://localhost:9091/User/CountAdmin
userRouter.route("/CountAdmin").get(async(req, res) => {
  let ro = await Role.findOne({nom : "ADMINISTRATEUR"})
  User.count({roles: ro._id},(err, number) => {
    res.json(number);
    return number;
  });
});

/////////////////////////////////////UNIVERSITE///////////////////////////

//http://localhost:9091/User/signupUniversite
userRouter.route("/signupUniversite").post((req, res) => {
  const universite = new User({
    nom: req.body.nom,
    prenom: req.body.nom,
    titre: req.body.titre,
    tel: req.body.tel,
    cin: req.body.cin,
    email: req.body.email,
    dateNaissance: req.body.dateNaissance,
    mdp: bcrypt.hashSync(req.body.mdp, 8),
    confirmMdp: bcrypt.hashSync(req.body.mdp, 8),
    paye: req.body.paye,
  });
  User.findOne({ cin: req.body.cin }).exec((err, user) => {
    if (user) {
      res.status(400).json({ message: "Faild! Login Alredy In Use !" });
      return;
    } else {
      universite.save((err, user) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log(err);
          return;
        }
        Role.findOne({ nom: "UNIVERSITE" }, (err, role) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          universite.roles = [role._id];
          universite.save((err) => {
            if (err) {
              res.status(500).json({ message: err });
              return;
            }
            res.status(200).json(universite);
          });
        });
      });
    }
  });
});

//http://localhost:9091/User/getAllUniversities
userRouter.route("/getAllUniversities").get(async (req, res) => {
  let u = await Role.find({ nom: "UNIVERSITE" });
  User.find({ roles: u }, (err, universities) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(universities);
    }
  }).populate("roles", "-__v");
});

//http://localhost:9091/User/CountUniversite
userRouter.route("/CountUniversite").get(async(req, res) => {
  let ro = await Role.findOne({nom : "UNIVERSITE"})
  User.count({roles: ro._id},(err, number) => {
    res.json(number);
    return number;
  });
});

////////////////////////////////////ETUDIANT/////////////////////////////

//http://localhost:9091/User/signupEtudiant
userRouter.route("/signupEtudiant/:idUniversite/:idClass").post((req, res) => {
  const etudiant = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    cin: req.body.cin,
    dateNaissance: req.body.dateNaissance,
    mdp: bcrypt.hashSync(req.body.dateNaissance, 8),
    confirmMdp: bcrypt.hashSync(req.body.dateNaissance, 8),
    class: req.params.idClass,
    institut: req.params.idUniversite,
  });
  User.findOne({ cin: req.body.cin }).exec((err, user) => {
    if (user) {
      res.status(400).json({ message: "Faild! CIN Alredy In Use !" });
      return;
    } else {
      etudiant.save((err, user) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        Role.findOne({ nom: "ETUDIANT" }, (err, role) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          etudiant.roles = [role._id];
          etudiant.save((err) => {
            if (err) {
              res.status(500).json({ message: err });
              return;
            }
            res.status(200).json(etudiant);
          });
        });
      });
    }
  });
});

//http://localhost:9091/User/getAllEtudiant
userRouter.route("/getAllEtudiant").get(async (req, res) => {
  let e = await Role.find({ nom: "ETUDIANT" });
  User.find({ roles: e }, (err, etudiants) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(etudiants);
    }
  }).populate("roles", "-__v").populate("class", "nom").populate("institut", "nom");
});

//http://localhost:9091/User/CountEtudiant
userRouter.route("/CountEtudiant").get(async(req, res) => {
  let ro = await Role.findOne({nom : "ETUDIANT"})
  User.count({roles: ro._id},(err, number) => {
    res.json(number);
    return number;
  });
});

//http://localhost:9091/User/CountEtudiantByUniversiteId/idUniversite
userRouter.route("/CountEtudiantByUniversiteId/:idUniversite").get(async(req, res) => {
  let ro = await Role.findOne({ nom: "ETUDIANT" });
    User.count({institut: req.params.idUniversite, roles: ro._id},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(number);
        } 
    });
});

//http://localhost:9091/User/countEtudiantByClassId/idClass
userRouter.route("/countEtudiantByClassId/:idClass").get(async(req, res) => {
  let ro = await Role.findOne({ nom: "ETUDIANT" });
    User.count({class: req.params.idClass, roles: ro._id},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(number);
        } 
    });
});

//http://localhost:9091/User/getEtudiantByClassId/idClass
userRouter.route("/getEtudiantByClassId/:idClass").get( (req, res) => {
  User.find({ class: req.params.idClass }, (err, etudiants) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(etudiants);
    }
  }).populate("roles", "-__v").populate("class", "nom").populate("institut", "nom");
});

//http://localhost:9091/User/CountEtudiantByClassId/idClass
userRouter.route("/CountEtudiantByClassId/:idUniversite").get(async(req, res) => {
  let ro = await Role.findOne({ nom: "ETUDIANT" });
    User.count({class: req.params.idClass, roles: ro._id},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(number);
        } 
    });
});

///////////////////////////////////ENSEIGNANT///////////////////////////

//http://localhost:9091/User/signupEnseignat
userRouter.route("/signupEnseignant/:idUniversite").post((req, res) => {
  const enseignant = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    cin: req.body.cin,
    dateNaissance: req.body.dateNaissance,
    mdp: bcrypt.hashSync(req.body.dateNaissance, 8),
    confirmMdp: bcrypt.hashSync(req.body.dateNaissance,8),
    institut: req.params.idUniversite,
  });
  User.findOne({ cin: req.body.cin }).exec((err, user) => {
    if (user) {
      res.status(400).json({ message: "Faild! CIN Alredy In Use !" });
      return;
    } else {
      enseignant.save((err, user) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        Role.findOne({ nom: "ENSEIGNANT" }, (err, role) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          enseignant.roles = [role._id];
          enseignant.save((err) => {
            if (err) {
              res.status(500).json({ message: err });
              return;
            }
            res.status(200).json(enseignant);
          });
        });
      });
    }
  });
});

//http://localhost:9091/User/Enseigant/getAllEnseignant
userRouter.route("/getAllEnseignant").get(async (req, res) => {
  let en = await Role.find({ nom: "ENSEIGNANT" });
  User.find({ roles: en }, (err, enseignants) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(enseignants);
    }
  });
});

//http://localhost:9091/User/getEnseignantByUniversiteId/idUniversite
userRouter.route("/getEnseignantByUniversiteId/:idUniversite").get(async (req, res) => {
  let en = await Role.find({ nom: "ENSEIGNANT" });
  User.find({institut: req.params.idUniversite, roles: en }, (err, enseignants) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(enseignants);
    }
  });
});

//http://localhost:9091/User/CountEnseignant
userRouter.route("/CountEnseignant").get(async(req, res) => {
  let ro = await Role.findOne({nom : "ENSEIGNANT"})
  User.count({roles: ro._id},(err, number) => {
    res.json(number);
    return number;
  });
});

//http://localhost:9091/User/CountEnseignantByUniversiteId/idUniversite
userRouter.route("/CountEnseignantByUniversiteId/:idUniversite").get(async(req, res) => {
  let ro = await Role.findOne({ nom: "ENSEIGNANT" });
    User.count({institut: req.params.idUniversite, roles: ro._id},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(number);
        } 
    });
});
//////////////////////////////////CLUB/////////////////////////////////

//http://localhost:9091/User/signupClub
userRouter.route("/signupClub/:idUniversite").post((req, res) => {
  const club = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    titre: req.body.titre,
    tel: req.body.tel,
    cin: req.body.cin,
    email: req.body.email,
    dateNaissance: req.body.dateNaissance,
    mdp: bcrypt.hashSync(req.body.dateNaissance, 8),
    confirmMdp: bcrypt.hashSync(req.body.dateNaissance, 8),
    specialite: req.body.specialite,
    institut : req.params.idUniversite,
  });
  User.findOne({ cin: req.body.cin }).exec((err, user) => {
    if (user) {
      res.status(400).json({ message: "Faild! Login Alredy In Use !" });
      return;
    } else {
      club.save((err, user) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        Role.findOne({ nom: "CLUB" }, (err, role) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          club.roles = [role._id];
          club.save((err) => {
            if (err) {
              res.status(500).json({ message: err });
              return;
            }
            res.status(200).json(club);
          });
        });
      });
    }
  });
});

//http://localhost:9091/User/Club/getAllClub
userRouter.route("/getAllClub").get(async (req, res) => {
  let en = await Role.find({ nom: "CLUB" });
  User.find({ roles: en }, (err, Club ) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(Club );
    }
  });
});

//http://localhost:9091/User/CountClub
userRouter.route("/CountClub").get(async(req, res) => {
  let ro = await Role.findOne({nom : "CLUB"})
  User.count({roles: ro._id},(err, number) => {
    res.json(number);
    return number;
  });
});

//http://localhost:9091/User/CountClubByUniversiteId/idUniversite
userRouter.route("/CountClubByUniversiteId/:idUniversite").get(async(req, res) => {
  let ro = await Role.findOne({ nom: "CLUB" });
    User.count({institut: req.params.idUniversite, roles: ro._id},(err, number) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(number);
        } 
    });
});

module.exports = userRouter;
