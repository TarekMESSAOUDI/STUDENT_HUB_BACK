const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors =require("cors");
const app = express()
const port = 9091
const userRouter = require('./Routes/UserRouter')
const blogRouter = require('./Routes/BlogRouter')
const commentaireRouter = require('./Routes/CommentaireRouter')
const emploisRouter = require('./Routes/EmploisRouter')
const tacheRouter = require('./Routes/TacheRouter')
const contactRouter = require('./Routes/ContactRouter')

mongoose.connect('mongodb://localhost:27017/StudentHub', {useNewUrlParser: true})

app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('Images'))

app.get('/',(req,res)=>{res.send("Hello Student Hub");})
app.use('/User', userRouter)
app.use('/Blog', blogRouter)
app.use('/Commentaire', commentaireRouter)
app.use('/Emplois', emploisRouter)
app.use('/Tache', tacheRouter)
app.use('/Contact', contactRouter)

app.listen(port, ()=>{ console.log(`http://localhost:${port}`)})