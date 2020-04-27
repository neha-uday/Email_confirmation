const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../model/userSchema');
const router = express.Router();
require("dotenv").config();
const crypto=require("crypto");
const randomstring= require('randomstring');
const app=express();

app.post('/send',(req,res)=>{

    if(req.body.email== " "){
        res.status(400).send("Input The Email");
    }
    console.error(req.body.email);
    User.findOne({
        where:{
            email:req.body.email,
        },
    }).then((user) => {
        if(user == null){
            console.log("email is not in the Database")
            res.status(403).send("Email Not in Database");
        }else{
            const result= (req.body,User);

            // Generate secret token
              const secretToken = randomstring.generate();
              console.log('secretToken', secretToken);
        
              // Save secret token to the DB
              result.value.secretToken = secretToken;
              
              //activating the account as false
              

              const body_mail = `Hi there,
             <br/>
             Thank you for registering!
             <br/><br/>
             Please verify your email by typing the following token:
             <br/>
             Token: <b>${secretToken}</b>
             <br/>
              On the following page:
             <a href="http://localhost:5000/users/verify">http://localhost:5000/users/verify</a>
             <br/><br/>
              Have a pleasant day.` ;

             // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: 'nehauday2000@gmail.com', // generated ethereal user
                  pass: 'neha@gmail' // generated ethereal password
                },
                tls:{
                    rejectUnauthorized:false
                }
              });


               // setup email data with unicode symbols
               let mailoptions = {
               from: "nehauday2000@gmail.com", //senders address
               to: `${user.email}`, // list of receivers
               subject: "Link to Login Verify your Email", // Subject line
               text: `http://localhost:2345/verify \n\n`, // plain text body
               html: body_mail //html body

               };
       
    
                // send mail with defined transport object
                transporter.sendMail(mailoptions, (error,info) => {
                    if(err){
                        console.log("there was an error",err)
                    }else{
                        console.log("Here is the response",res)
                        res.status(200).json("Confirmation email sent!!");
                    }       
                });
            }
        });
    });

    module.exports= router;