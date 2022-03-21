const express = require("express");
const contactRouter = express.Router();
const nodemailer = require('nodemailer');
app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'tarek.messaoudi@esprit.tn',
        pass: 'curvanord193JMT5213'
    }
});

contactRouter.route("/")
.post((req,res)=>{

    const mailOptions = {
        from: 'tarek.messaoudi@esprit.tn',
        to: req.body.email,
        subject: req.body.sujet,
        text: req.body.message,
    }

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        } else {
            console.log('Email sent : ' + info.response);
            res.status(200);
        }
    });
});

module.exports=contactRouter
