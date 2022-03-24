const express = require("express");
const contactRouter = express.Router();
const nodemailer = require('nodemailer');
const cors =require("cors");
const app = express();

app.use(cors());


contactRouter.route("/")
//http://localhost:9091/Contact
.post((req,res)=>{
    /*const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: req.body.email,
            pass: req.body.pass,
        }
    });*/
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e2e4c0911d9792",
            pass: "0ae8378ab2ea80"
        }
    });
    const mailOptions = {
        from: req.body.email,
        to: "tarek.messaoudi@esprit.tn" ,
        subject: req.body.sujet,
        text: req.body.message,
    }
    /*transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
            res.status(500).json(err)
        } else {
            console.log('Email sent : ' + info.response);
            res.status(200).json(mailOptions);
        }
    });*/
    transport.sendMail(mailOptions, function(err, info){
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
