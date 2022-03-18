const express = require("express")
const imageRouter = express.Router()
const Image = require("../Models/ImageModel")

imageRouter.route("/")
//get all images
.get((req,res)=>{
    Image.find({},(err,image)=>{
        if(err){res.send(400).json({msg:"No Image Found"})}
        else{res.json(image)}
    })
})
//add image
.post((req,res)=>{
    let image = new Image(req.body)
    image.save()
    res.status(201).send(image)
})
imageRouter.route('/:id')
    // get image by id
    //http://localhost:9091/image/id
    .get((req,res)=>{
        Image.findById(req.params.id, (err,image)=>{
            if (err) {
                res.sendStatus(400).json({msg: 'No Image found with this ID'})
            }
            res.json(image)
        })
    })
    // update image
    //http://localhost:9091/image/id
    .put((req,res) => {
        Image.findById(req.params.id, (err, image) => {
            image.nom = req.body.nom
            image.save()
            res.json(image)
        }) 
    })
    // delete image
    //http://localhost:9091/image/id
    .delete((req,res)=>{
        Image.findById(req.params.id, (err, image) => {
            image.delete(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })

module.exports=imageRouter