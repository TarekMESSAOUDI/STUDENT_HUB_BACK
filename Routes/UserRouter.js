const express = require("express");
const userRouter = express.Router();
const User = require("../Models/UserModel");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './Images/User/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
    cb(null, true);
    } else {
    cb(new Error("le fichier doit etre jpeg, jpg ou png"), null, false);
    }
};
const image = multer({
    storage: storage, 
    limits:{
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

userRouter.route("/")
//http://localhost:9091/User
.get((req, res) => {
    User.find({}, (err, users) => {
        if (err) { 
            res.send(400).json(err); 
        } else { 
            res.json(users); 
        }
    });
});

userRouter.route("/Count")
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

userRouter.route('/:id')
//http://localhost:9091/User/id
.get((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.sendStatus(400).json(err);
        } else {
            res.json(user);
        }
    });
});

userRouter.route('/:id')
//http://localhost:9091/User/id
.put((req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.nom = req.body.nom
        user.prenom = req.body.prenom
        user.titre = req.body.titre
        user.mdp = req.body.mdp
        user.confirmMdp = req.body.confirmMdp
        user.rang = req.body.rang
        user.image = req.file.image
        user.sex = req.body.sex
        user.save();
        if(err){
            res.status(400).json(err);
        } else {
            res.json(user);
        }
    });
});

//http://localhost:9091/User/id
userRouter.route('/:id')
.delete((req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.delete(err => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.status(204).send('Supprimé Avec Succes :)')
            }
        });
    });
});

//Universite    
userRouter.route("/Universite")
//http://localhost:9091/User/Universite
.get((req, res) => {
    User.find({role: "UNIVERSITE"}, (err, universities) => {
        if (err) { 
            res.status(400).json(err) 
        } else { 
            res.json(universities) 
        }
    });
});

//http://localhost:9091/User/Universite
userRouter.route("/Universite")
.post(image.single("image"),(req, res) => {
    req.body.role = "UNIVERSITE"
    let user = new User(req.body)
    user.nom = req.body.nom
    user.titre = req.body.titre
    user.email = req.body.email
    user.cin = req.body.cin
    user.tel = req.body.tel
    user.image = req.file.path
    user.ville = req.body.ville
    user.rue = req.body.rue
    user.codePostal = req.body.codePostal
    user.mdp = req.body.mdp
    user.confirmMdp = req.body.confirmMdp
    user.save()
    res.status(201).json("Université Ajouté avec Succes :)")
});

//Etudiant    
userRouter.route("/Etudiant")
//http://localhost:9091/User/Etudiant
.get((req, res) => {
    User.find({role: "ETUDIANT"}, (err, etudiants) => {
        if (err) { 
            res.status(400).json(err) 
        } else { 
            res.json(etudiants) 
        }
    });
});

userRouter.route("/Etudiant")
//http://localhost:9091/User/Etudiant
.post((req, res) => {
    req.body.role = "ETUDIANT"
    let user = new User(req.body)
    user.nom = req.body.nom
    user.prenom = req.body.prenom
    user.titre = req.body.titre
    user.email = req.body.email
    user.tel = req.body.tel
    user.cin = req.body.cin
    user.addresse.ville = req.body.addresse.ville
    user.addresse.rue = req.body.addresse.rue
    user.addresse.codePostal = req.body.addresse.codePostal
    user.dateNaissance = req.body.dateNaissance
    user.mdp = req.body.mdp
    user.confirmMdp = req.body.confirmMdp
    user.disponibilite = req.body.disponibilite
    user.rang = req.body.rang
    user.image = req.body.image
    user.sex = req.body.sex
    user.save()
    res.status(201).send("Etudiant Ajouté avec Succès :)")
});

//Enseigant    
userRouter.route("/Enseignant")
//http://localhost:9091/User/Enseigant
.get((req, res) => {
    User.find({role: "ENSEIGNANT"}, (err, enseignants) => {
        if (err) { 
            res.status(400).json(err); 
        } else { 
            res.json(enseignants); 
        }
    });
});

//http://localhost:9091/User/Enseignant
userRouter.route("/Enseignant")
.post((req, res) => {
    req.body.role = "ENSEIGNANT"
    let user = new User(req.body)
    user.nom = req.body.nom
    user.prenom = req.body.prenom
    user.titre = req.body.titre
    user.email = req.body.email
    user.tel = req.body.tel
    user.cin = req.body.cin
    user.addresse.ville = req.body.addresse.ville
    user.addresse.rue = req.body.addresse.rue
    user.addresse.codePostal = req.body.addresse.codePostal
    user.dateNaissance = req.body.dateNaissance
    user.mdp = req.body.mdp
    user.confirmMdp = req.body.confirmMdp
    user.disponibilite = req.body.disponibilite
    user.rang = req.body.rang
    user.image = req.body.image
    user.sex = req.body.sex
    user.save()
    res.status(201).send("Enseignant Ajouté avec Succes :)")
});

//Club    
userRouter.route("/Club")
//http://localhost:9091/User/Club
.get((req, res) => {
    User.find({role: "CLUB"}, (err, club) => {
        if (err) { 
            res.status(400).json(err) 
        } else { 
            res.json(club) 
        }
    });
});

userRouter.route("/Club")
//http://localhost:9091/User/Club
.post((req, res) => {
    req.body.role = "CLUB"
    let user = new User(req.body)
    user.nom = req.body.nom
    user.prenom = req.body.prenom
    user.titre = req.body.titre
    user.email = req.body.email
    user.tel = req.body.tel
    user.cin = req.body.cin
    user.addresse.ville = req.body.addresse.ville
    user.addresse.rue = req.body.addresse.rue
    user.addresse.codePostal = req.body.addresse.codePostal
    user.dateNaissance = req.body.dateNaissance
    user.mdp = req.body.mdp
    user.confirmMdp = req.body.confirmMdp
    user.disponibilite = req.body.disponibilite
    user.rang = req.body.rang
    user.image = req.body.image
    user.sex = req.body.sex
    user.save()
    res.status(201).send("Club Ajouté avec Succes :)")
});

module.exports = userRouter