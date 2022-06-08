const employee = require("../models/empSchema");
// const visitor = require("../models/visitorSchema");
const vehicle = require("../models/vehicleSchema");

// const lib = require ("../controller/userController")

const { errorHandler, successHandler } = require('./../helper/handlers');

const createVehicle = async (req,res) => {
    try{
        const Employee = new employee();
        const Vehicle = new vehicle();
        // const Visitor = new visitor();
        // const Product = new product();

        Vehicle.visitorId= req.params.visitorId;
        Vehicle.vehicleNumber = req.body.vehicleNumber;
        Vehicle.vehicleType = req.body.vehicleType;
        Vehicle.vehiclePhoto = req.body.vehiclePhoto;
        Vehicle.authorizedPerson = req.body.authorizedPerson;
        Vehicle.createdBy = req.body.createdBy;
        Vehicle.updatedBy = req.body.updatedBy;
        Vehicle.approvedBy = Employee._id;
        // Vehicle.save()
        let result = await Vehicle.save()
        successHandler(req, res, { data: result, message: 'user creation success'})

    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}


//list

const vehicleList = async (req,res) => {
    try{
        let result = await vehicle.find({})
        successHandler(req, res, { data: result, message: 'view the visitor details'})
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}


//view details

const getvehicle = async (req,res) => {
    try{
        const id =req.params.id;
        let result = await vehicle.find({_id:id})
        successHandler(req,res, {data:result,message: 'view the visitor details'})
    }
    catch(err){
        errorHandler(req,res,err,500);
    }
}

//update
const updateVehicle = async (req,res) =>{
    console.log("update")
        try{
            const id =req.body._id;
            console.log(id)
            let result = await vehicle.updateOne({_id:id},req.body)
            successHandler(req, res, { Employee: result, message: 'update'})
        }
        catch(err){
            errorHandler(req, res, err, 500)
        }
    }

//delete

const deleteVehicle = async (req,res) => {
    try{
        const id =req.params.id;
        // const userId = req.params.userId;
        let result = await vehicle.findByIdAndDelete({_id: id})
        successHandler(req, res, { Employee: result, message: 'delete the user'})
    }
    catch(err){
        errorHandler(req, res, err, 500)
    }
}

module.exports ={createVehicle,vehicleList ,getvehicle,updateVehicle,deleteVehicle}