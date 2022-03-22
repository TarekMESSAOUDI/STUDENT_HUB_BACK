const express = require("express");
const contactRouter = express.Router();
const nodemailer = require('nodemailer');
app = express();

contactRouter.route("/")
//http://localhost:9091/Contact
.post((req,res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: req.body.from,
            pass: req.body.pass,
        }
    });
    const mailOptions = {
        from: 'tarek.messaoudi@esprit.tn',
        to: req.body.email,
        subject: req.body.sujet,
        text: req.body.message,
    }
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
            res.status(500).json(err)
        } else {
            console.log('Email sent : ' + info.response);
            res.status(200).json(mailOptions);
        }
    });
});

module.exports=contactRouter
