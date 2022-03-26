const express = require("express");
const skillsRouter = express.Router()
const Skills = require("../Models/SkillsModel");

skillsRouter.route("/")
.post((req,res) =>{
    let skills = new Skills(req.body)
    skills.save();
})
//http://localhost:9091/Skills
.get((req, res) => {
    Skills.find({}, (err, skills) => {
        if (err) { 
            res.send(400).json(err); 
        } else { 
            res.json(skills); 
        }
    });
});

module.exports=skillsRouter