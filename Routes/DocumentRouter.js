const express = require("express");
const documentRouter = express.Router();
const Document = require("../Models/DocumentModel");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images/Document/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const image = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//http://localhost:9091/Document/addDocument/idUniversite/idMatiere/categorie
documentRouter.route("/addDocument/:idUniversite/:idMatiere/:categorie").post(image.single("nom"),(req, res) => {
  const doc = new Document({
    type: req.body.type,
    categorie: req.params.categorie,
    universite: req.params.idUniversite,
    matiere: req.params.idMatiere,
    nom: req.file.originalname,
  });
  doc.save((err, document)=>{
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(document);
    }
  })
});

//http://localhost:9091/Document/getByCategorieAndMatiere/categorie/idMatiere
documentRouter.route("/getByCategorieAndMatiere/:categorie/:idMatiere").get((req, res) => {
  Document.find({categorie: req.params.categorie, matiere: req.params.idMatiere}, (err, documents) => {
    if (err) {
      console.log(err)
      res.status(400).json(err);
    } else {
      res.status(200).json(documents);
    }
  });
});
  
//http://localhost:9091/Document/getAdministrative
documentRouter.route("/getAdministrative").get((req, res) => {
  Document.find({categorie: "ADMINISTRATIVE"}, (err, document) => {
    if (err) {
      console.log(err)
      res.status(400).json(err);
    } else {
      res.status(200).json(document);
    }
  });
});

//http://localhost:9091/Document/getSchool
documentRouter.route("/getSchool").get((req, res) => {
  Document.find({categorie: "SCHOOL"}, (err, document) => {
    if (err) {
      console.log(err)
      res.status(400).json(err);
    } else {
      res.status(200).json(document);
    }
  });
});

//http://localhost:9091/Document/delete/idDoc
documentRouter.route("/delete/:idDoc").delete((req, res) => {
  Document.findByIdAndDelete((req.params.idDoc), (err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("Supprimé Avec Succes :)");
    }
  });  
});

module.exports = documentRouter;