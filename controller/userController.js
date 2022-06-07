
const employee = require("../models/empSchema");
const role = require("../models/roles");

var generator = require('generate-password');

require('dotenv').config()
const { errorHandler, successHandler } = require('./../helper/handlers');
const { getMaxListeners } = require("../models/empSchema");
const bcrypt = require ('bcrypt');
const  sendMail  = require("../mailer/sendMail");



//create
const createUser = async (req,res) => {
    try {
        const Role = new role();
        let Employee = new employee();
        Role.roleName = req.body.roleName;
        Role.deletedAt = req.body.deletedAt;
        Role.isDeleted =false;
        Role.save()

        var pwd = generator.generate({
            length: 8,
            numbers: true,
            unique: true
        })

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword =  await bcrypt.hash(pwd,salt);

        Employee.empId =req.body.empId;
        Employee.firstName = req.body.firstName;
        Employee.lastName = req.body.lastName;
        Employee.email = req.body.email;
        Employee.password = encryptedPassword;
        Employee.role = Role._id;
        Employee.status = true;
        Employee.address = req.body.address;
        Employee.contactNo = req.body.contactNo;
        Employee.employeeImage = req.body.employeeImage;
        
        sendMail.sendMail(Employee.email);
        let result = await Employee.save()
        successHandler(req, res, { data: result, message: 'user creation success'})
    }
    catch(err) {
        errorHandler(req, res, err, 500);
    }
}

//list

const userList = async (req,res) => {
    try{
        let result = await employee.find({status: true})
        successHandler(req, res, { data: result, message: 'view the all user'})
    }
    catch(err){
        errorHandler(req, res, err, 500); 
    }
}

//view details

const getUsers = async (req,res) => {
    try{
        const id =req.params.id;
        let result = await employee.find({_id: id})
        successHandler(req, res, { data: result, message: 'view the user details'})
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
};

//delete

const deleteUsers = async (req,res) => {
    try{
        const id =req.params.id;
        // const userId = req.params.userId;
        let result = await employee.findByIdAndDelete({_id: id})
        successHandler(req, res, { Employee: result, message: 'delete the user'})
    }
    catch(err){
        errorHandler(req, res, err, 500)
    }
}

//soft delete
const inActive = async (req,res) => {
    try{
        const id = req.params.id;
        console.log(id)
        let result = await employee.findByIdAndUpdate(id, {"$set": {"status" : false} })
        successHandler(req, res, { Employee: result, message: 'soft delete'})
        // nxt()
    }
    catch(err){
        errorHandler(req, res, err, 500)
    }
};


//update
const updateUser = async (req,res) =>{
    console.log("update")
        try{
            const id =req.body._id;
            console.log(id)
            let result = await employee.updateOne({_id:id},req.body)
            successHandler(req, res, { Employee: result, message: 'update'})
        }
        catch(err){
            errorHandler(req, res, err, 500)
        }
    }

//search

const searchUser =async (req,res) => {
    try{
        const data =req.body
        console.log(data
            )
        let result = await employee.find(
            {
                $or: [

                    {firstName: {$regex: data}},
                    {email: {$regex: data}},
                    {contactNo: {$regex: data}},
                ],
            },
            console.log(data)
        
        )
        successHandler(req, res, { Employee: result, message: 'search'})
    }
    catch(err){
        errorHandler(req, res, err, 500)
    }
}


module.exports = {
    createUser,userList,getUsers,deleteUsers,inActive,updateUser,searchUser
}