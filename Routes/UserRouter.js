const express = require("express");
const userRouter = express.Router();
const User = require("../Models/UserModel");
const multer = require("multer");
var ObjectId = require('mongoose').Types.ObjectId;
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

userRouter.post("/SignUp",(request,response)=>{
    const signedUpuser= new User({
        nom:request.body.nom,
        prenom:request.body.prenom, 
        titre:request.body.titre,
        email:request.body.email,
        tel:request.body.tel,
        cin:request.body.cin,
        adrresse:request.body.adresse,
        mdp:request.body.mdp,
        confirmMdp:request.body.confirmMdp,
        desactiver:request.body.desactiver,
        resettoken:request.body.resettoken,
        disponibilite:request.body.disponibilite,
        rang:request.body.rang,
        sex:request.body.sex,   
    })
    signedUpuser.save().then(data =>{
        response.json(data)
    })
    .then(error =>{
        response.json(error)
    })
})

userRouter.route("/getAll")
//http://localhost:9091/User/getAll
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

userRouter.route('/getById/:id')
//http://localhost:9091/User/getById/id
.get((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.sendStatus(400).json(err);
        } else {
            res.json(user);
        }
    });
});

userRouter.route('delete/:id')
//http://localhost:9091/User/delete/id
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


userRouter.route('/:id')
//http://localhost:9091/User/id
.put((req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, doc) => {
        if (!err) {res.send(doc);}
        else {console.log('Error in User Update :' + JSON.stringify(err, undefined, 2));}
    });
});

//Universite    
userRouter.route("/Universite/getAll")
//http://localhost:9091/User/Universite/getAll
.get((req, res) => {
    User.find({role: "UNIVERSITE"}, (err, universities) => {
        if (err) { 
            res.status(400).json(err) 
        } else { 
            res.json(universities) 
        }
    });
});

userRouter.route("/Universite/add")
//http://localhost:9091/User/Universite/add
.post(image.single("image"),(req, res) => {
    req.body.role = "UNIVERSITE"
    let user = new User(req.body)
    user.profileImage = req.file.originalname
    user.save()
    res.status(201).json("Université Ajouté avec Succes :)")
});

//Etudiant    
userRouter.route("/Etudiant/getAll")
//http://localhost:9091/User/Etudiant/getAll
.get((req, res) => {
    User.find({role: "ETUDIANT"}, (err, etudiants) => {
        if (err) { 
            res.status(400).json(err) 
        } else { 
            res.json(etudiants) 
        }
    });
});

userRouter.route("/Etudiant/add")
//http://localhost:9091/User/Etudiant/add
.post(image.single("profileImage"),(req, res) => {
    req.body.role = "ETUDIANT"
    let user = new User(req.body);
    user.profileImage = req.file.originalname;
    user.save()
    res.status(201).send("Etudiant Ajouté avec Succès :)")
});

userRouter.route("/Image/cover/:id")
//http://localhost:9091/User/Image/cover/id
.put(image.single("coverImage"),(req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.coverImage = req.file.originalname;
        user.save();
        if(err){
            res.sendStatus(400).json(err);
            console.log(err);
        } else {
            res.json(user);
        }
    });
});


userRouter.route("/Image/institut/:id")
//http://localhost:9091/User/Image/institut/id
.put(image.single("institutImage"),(req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.institutImage = req.file.originalname;
        user.save();
        if(err){
            res.sendStatus(400).json(err);
            console.log(err);
        } else {
            res.json(user);
        }
    });
});

//Enseigant    
userRouter.route("/Enseignant/getAll")
//http://localhost:9091/User/Enseigant/getAll
.get((req, res) => {
    User.find({role: "ENSEIGNANT"}, (err, enseignants) => {
        if (err) { 
            res.status(400).json(err); 
        } else { 
            res.json(enseignants); 
        }
    });
});

userRouter.route("/Enseignant/add")
//http://localhost:9091/User/Enseignant/add
.post((req, res) => {
    req.body.role = "ENSEIGNANT"
    let user = new User(req.body)
    user.save()
    res.status(201).send("Enseignant Ajouté avec Succes :)")
});

//Club    
userRouter.route("/Club/getAll")
//http://localhost:9091/User/Club/getAll
.get((req, res) => {
    User.find({role: "CLUB"}, (err, club) => {
        if (err) { 
            res.status(400).json(err) 
        } else { 
            res.json(club) 
        }
    });
});

userRouter.route("/Club/add")
//http://localhost:9091/User/Club/add
.post((req, res) => {
    req.body.role = "CLUB"
    let user = new User(req.body)
    user.save()
    res.status(201).send("Club Ajouté avec Succes :)")
});

module.exports = userRouter