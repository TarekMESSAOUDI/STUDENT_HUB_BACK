const express = require("express")
const emploisRouter = express.Router()
const Emplois = require("../Models/EmploisModel")

emploisRouter.route("/")
//get all emplois
//http://localhost:9091/emplois
.get((req,res)=>{
    Emplois.find({},(err,emplois)=>{
        if(err){res.send(400).json({msg:"No Emplois Found"})}
        else{res.json(emplois)}
    })
})
//add emplois
//http://localhost:9091/emplois
.post((req,res)=>{
    let emplois = new Emplois(req.body)
    emplois.save()
    res.status(201).send(emplois)
})
emploisRouter.route('/:id')
    // get emplois by id
    //http://localhost:9091/emplois/id
    .get((req,res)=>{
        Emplois.findById(req.params.id, (err,emplois)=>{
            if (err) {
                res.sendStatus(400).json({msg: 'No Emplois found with this ID'})
            }
            res.json(emplois)
        })
    })
    // update emplois
    //http://localhost:9091/emplois/id
    .put((req,res) => {
        Emplois.findById(req.params.id, (err, emplois) => {
            emplois.nom = req.body.nom
            emplois.save()
            res.json(emplois)
        }) 
    })
    // delete emplois
    //http://localhost:9091/emplois/id
    .delete((req,res)=>{
        Emplois.findById(req.params.id, (err, emplois) => {
            emplois.delete(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })

module.exports=emploisRouter