const employee = require("../models/empSchema");
// const visitor = require("../models/visitorSchema");
const vehicle = require("../models/vehicleSchema");

const lib = require ("../controller/userController")

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
        Vehicle.approvedBy = lib._id;
        // Vehicle.save()
        let result = await Vehicle.save()
        successHandler(req, res, { data: result, message: 'user creation success'})

    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}
module.exports ={createVehicle}