const express = require("express")
const tacheRouter = express.Router()
const Tache = require("../Models/TacheModel")

tacheRouter.route("/")
//get all taches
.get((req,res)=>{
    Tache.find({},(err,tache)=>{
        if(err){res.send(400).json({msg:"No Tache Found"})}
        else{res.json(tache)}
    })
})
//add tache
.post((req,res)=>{
    let tache = new Tache(req.body)
    tache.save()
    res.status(201).send(tache)
})
tacheRouter.route('/:id')
// get tache by id
//http://localhost:9091/tache/id
.get((req,res)=>{
    Tache.findById(req.params.id, (err,tache)=>{
        if (err) {
            res.sendStatus(400).json({msg: 'No Tache found with this ID'})
        }
        res.json(tache)
    })
})
// update tache
//http://localhost:9091/tache/id
.put((req,res) => {
    Tache.findById(req.params.id, (err, tache) => {
        tache.nom = req.body.nom
        tache.save()
        res.json(tache)
    }) 
})
// delete tache
//http://localhost:9091/tache/id
.delete((req,res)=>{
    Tache.findById(req.params.id, (err, tache) => {
        tache.delete(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })
})

module.exports=tacheRouter