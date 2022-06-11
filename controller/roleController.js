const role = require('../models/roles');
const Role = new role();

const { errorHandler, successHandler } = require('./../helper/handlers');

const createRole = async (req,res) => {
    try{
        Role.roleName = req.body.roleName;
        Role.deletedAt = req.body.deletedAt;
        Role.isDeleted = req.body.isDeleted;
        let result = await Role.save()
        successHandler(req, res, { data: result, message: 'role creation success'})
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }

}

const list = async (req,res) => {
    try{
        let result = await role.find({})
        successHandler(req, res, { data: result, message: 'view the role'})
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}



module.exports ={
    createRole, list
}