const express = require("express")
const userRouter = express.Router()
const User = require("../Models/UserModel")

userRouter.route("/")
    //get all users
    //http://localhost:9091/User
    .get((req, res) => {
        User.find({}, (err, users) => {
            if (err) { res.send(400).json({ msg: "No User Found" }) }
            else { res.json(users) }
        })
    })
    //add user
    //http://localhost:9091/User
    .post((req, res) => {
        let user = new User(req.body)
        user.save()
        res.status(201).send(user)
    })

userRouter.route('/:id')
    // get user by id
    //http://localhost:9091/User/id
    .get((req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.sendStatus(400).json({ msg: 'No User found with this ID' })
            }
            res.json(user)
        })
    })
    // update user
    //http://localhost:9091/User/id
    .put((req, res) => {
        User.findById(req.params.id, (err, user) => {
            user.nom = req.body.nom
            user.prenom = req.body.prenom
            user.save()
            res.json(user)
        })
    })
    // delete user
    //http://localhost:9091/User/id
    .delete((req, res) => {
        User.findById(req.params.id, (err, user) => {
            user.delete(err => {
                if (err) {
                    res.status(500).send(err)
                }
                else {
                    res.status(204).send('removed')
                }
            })
        })
    })

module.exports = userRouter