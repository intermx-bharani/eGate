const generator = require('generate-password');
const nodeMailer = require("nodemailer");

require("dotenv").config();

const sendMail = async (email,pwd) => {
    const send = nodeMailer.createTransport({
        service: "Gmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD, 
        }
    });

    send.sendMail({
        to:email,
        subject:'generate password',
        html: ` Email :${email}</br>
         password : ${pwd}`
    })
}

module.exports = {
    sendMail
}