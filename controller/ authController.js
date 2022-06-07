// const express = require("express");
// const router = express.Router();
const employee = require("../models/empSchema");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const  sendMail  = require("../mailer/sendMail");
require('dotenv').config()

//login
const login = async (req,res) => {
    const {email} = req.body
    console.log(email)
    const {password} = req.body
    console.log(password)
    if(!email) {
        return res.status(422).send({
            message: "Missing email or password"
       });
    }
    const emp = await employee.findOne({email:email})
    const match = await bcrypt.compare(password,emp.password)
    console.log(match)
    if(match){
        const token = jwt.sign((email),process.env.USER_VERIFICATION_TOKEN_SECRET)
        console.log(token)
        const verify = jwt.verify(token,process.env.USER_VERIFICATION_TOKEN_SECRET)
        // res.send("logged in")
        res.send(token)
    }
    else{
        res.send("password error")
    }
}

//forget
const forget = async (req,res) => {
    const {email} = req.body
    sendMail.sendMail(email);
    console.log(email)

    return ("reset successfully")
}

//change password
const change = async (req,res) => {
    const Employee = new employee();
    const {password,email} = req.body
    if (password){
        console.log(password)
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password,salt);
        console.log(encryptedPassword)

        return  employee.updateMany({email:email},{password:encryptedPassword},req.body).catch((err) => {
            console.log(password)
            console.log(err),{employee:req.body}
            });
    }
    
}

module.exports =  {login,forget,change};
