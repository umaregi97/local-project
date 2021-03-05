let mongoose = require('mongoose')
var nodemailer = require('nodemailer');
let User = require('./models/user')
require('dotenv').config();


let userRegister = async (req,res) => {
    console.log("Welcome", req.body)
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        await User.create(req.body, async(err, data) => {
           if (err) {
                res.send(err)
            }
           else if (!data.email) {
               console.warn("Validation Error")
               res.status(200).json({message : `validation error`})
            }
           else {
                console.log("result of db is", data)
               await sendMail(data)
               res.status(200).json({message : data}) 
            } 
        })
    }
    else {
        res.status(200).json({message :`User already Exit`})
    }
   
    
}

let sendMail = async (toMail) => {
    console.log("To mail is ", toMail,process.env.mailAddress)

    let testAccount = await nodemailer.createTestAccount();


    let transporter = nodemailer.createTransport({
       // service: 'gmail',
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.mailAddress ? process.env.mailAddress : testAccount.user , // generated ethereal user
            pass: process.env.mailPassword ? process.env.mailPassword: testAccount.pass, // generated ethereal password
        },
    });

        let info = await transporter.sendMail({
            from: '"USER REGISTRATION" <umaregi97@gmail.com>', // sender address
            to: toMail.email, // list of receivers
            subject: "USER REGISTRATION", // Subject line
            text: "", // plain text body
            html: `<b> ${toMail.firstName}, Your account successfully Registered </b>`, // html body
        });
    console.log("Message sent: %s", info);
    
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    

  // Preview only available when sending through an Ethereal account
    
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    
    return `success`
}


module.exports = {userRegister}