const express = require("express")
const commentaireRouter = express.Router()
const Commentaire = require("../Models/CommentaireModel")

commentaireRouter.route("/")
//get all commentaires
//http://localhost:9091/commentaire
.get((req,res)=>{
    Commentaire.find({},(err,commentaires)=>{
        if(err){res.send(400).json({msg:"No commentaire Found"})}
        else{res.json(commentaires)}
    })
})
//add commentaire
//http://localhost:9091/commentaire
.post((req,res)=>{
    let commentaire = new Commentaire(req.body)
    commentaire.save()
    res.status(201).send(commentaire)
})
commentaireRouter.route('/:id')
    // get commentaire by id
    //http://localhost:9091/commentaire/id
    .get((req,res)=>{
        Commentaire.findById(req.params.id, (err,commentaire)=>{
            if (err) {
                res.sendStatus(400).json({msg: 'No Commentaire found with this ID'})
            }
            res.json(commentaire)
        })
    })
    // update commentaire
    //http://localhost:9091/commentaire/id
    .put((req,res) => {
        Commentaire.findById(req.params.id, (err, commentaire) => {
            commentaire.description = req.body.description
            commentaire.save()
            res.json(commentaire)
        }) 
    })
    // delete commentaire
    //http://localhost:9091/commentaire/id
    .delete((req,res)=>{
        Commentaire.findById(req.params.id, (err, commentaire) => {
            commentaire.delete(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })

module.exports=commentaireRouter