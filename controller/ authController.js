const employee = require("../models/empSchema");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
var generator = require("generate-password");
const  sendMail  = require("../mailer/sendMail");
const { errorHandler, successHandler } = require('./../helper/handlers');
require('dotenv').config()

//login
const login = async (req,res) => {
    try{
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
        console.log(emp.password)
        
        console.log(match)
        if(match){
            const token = jwt.sign((email),process.env.USER_VERIFICATION_TOKEN_SECRET)
            console.log(token)
            // res.send("logged in")
            // res.send(token)
            successHandler(req, res, { data: token, message: 'login'})

        }

    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}


//forget
const forget =  async (req,res) => {
    try{
        const {email} = req.body
        const pwd =generator.generate({
            length: 8,
            numbers: true,
            unique: true
        });
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(pwd,salt);
        console.log(encryptedPassword)
        const forgetpassword = await employee.updateOne({email:email},
            {password:encryptedPassword},req.body)
        console.log(email); 
        sendMail.sendMail(email,pwd);   
        successHandler(req, res, { data: forgetpassword, message: 'forget password change'})

    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}

//change password
const change = async (req,res) => {
    try{
        const Employee = new employee();
        const {password,email} = req.body
        if (password){
            console.log(password)
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password,salt);
            console.log(encryptedPassword)
    
            let result = await employee.updateMany({email:email},{password:encryptedPassword},req.body)
            successHandler(req, res, { data: result, message: 'password change'})
        }
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
    
}

module.exports =  {login,forget,change};
