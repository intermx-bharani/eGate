const employee = require("../models/empSchema");
const visitor = require("../models/visitorSchema");
const vehicle = require("../models/vehicleSchema");
const employeeAvailable = require("../models/employeeAvailable");

const { errorHandler, successHandler } = require("./../helper/handlers");
//user daily report
const dailyAttendance = async (req,res) => {
    try{
        const Date = req.params.date
        let query = await employeeAvailable.find({date: Date})
            successHandler(req, res, {
                data: query,
                message: "count",
              });
        }
        catch(err){
            errorHandler(req,res,err,500)
        }
};

const employeeActive = async (req,res) => {
    try{
        let query = await employee.find({isActive: true}).count()
        successHandler(req, res, {
            data: query,
            message: "count",
          });
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
};


//visitor daily report

const visitorEntry = async (req,res) => {
    try{
        const Date = req.body.date
        let query = await visitor.find({date:Date}).count()
        successHandler(req, res, {
            data: query,
            message: "count2223",
          });
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
}  

const visitorIn = async (req,res) => {
    try{
        const id = req.params.id
        let query = await visitor.find({status: id}).count()
        successHandler(req, res, {
            data: query,
            message: "count678",
          });
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
}


const visitorOut = async (req,res) => {
    try{
        const id = req.params.id
        let query = await visitor.find({status: id}).count()
        successHandler(req, res, {
            data: query,
            message: "count678",
          });
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
}


//vehicle daily report
const vehicleEntry = async (req,res) => {
    try{
        const Date = req.body.date
        let query = await vehicle.find({date:Date}).count()
        successHandler(req, res, {
            data: query,
            message: "count456",
          });
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
}

const vehicleIn = async (req,res) => {
    try{
        const id = req.params.id
        let query = await vehicle.find({status: id}).count()
        successHandler(req, res, {
            data: query,
            message: "count1234",
          });
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
    
}

const vehicleOut = async (req,res) => {
    try{
        const id = req.params.id
        let query = await vehicle.find({status: id}).count()
        successHandler(req, res, {
            data: query,
            message: "count678",
          });
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
}


module.exports = {
    dailyAttendance,
    employeeActive,
    visitorEntry,
    visitorIn,
    visitorOut,
    vehicleEntry,
    vehicleIn,
    vehicleOut
  };