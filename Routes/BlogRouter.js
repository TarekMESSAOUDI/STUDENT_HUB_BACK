const express = require("express")
const blogRouter = express.Router()
const Blog = require("../Models/BlogModel")

blogRouter.route("/")
//get all blogs
.get((req,res)=>{
    Blog.find({},(err,users)=>{
        if(err){res.send(400).json({msg:"No Blog Found"})}
        else{res.json(users)}
    })
})
//add blog
.post((req,res)=>{
    let blog = new Blog(req.body)
    blog.save()
    res.status(201).send(blog)
})

blogRouter.route('/:id')
// get blog by id
//http://localhost:9091/blog/id
.get((req,res)=>{
    Blog.findById(req.params.id, (err,blog)=>{
        if (err) {
            res.sendStatus(400).json({msg: 'No Blog found with this ID'})
        }
        res.json(blog)
    })
})
// update blog
//http://localhost:9091/blog/id
.put((req,res) => {
    Blog.findById(req.params.id, (err, blog) => {
        blog.titre = req.body.titre
        blog.description = req.body.description
        blog.save()
        res.json(blog)
    }) 
})
// delete blog
//http://localhost:9091/blog/id
.delete((req,res)=>{
    Blog.findById(req.params.id, (err, blog) => {
        blog.delete(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })
})

module.exports=blogRouter