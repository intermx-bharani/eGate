const employeeAvailable = require("../models/employeeAvailable");

const { errorHandler, successHandler } = require("../helper/handlers");

//create
const createAttendance = async (req, res) => {
  try {
    let EmployeeAvailable = new employeeAvailable();

    EmployeeAvailable.date = new Date(req.body.date);
    EmployeeAvailable.employee = req.body.employee;
    EmployeeAvailable.createdBy = req.body.createdBy;
    EmployeeAvailable.count= req.body.employee.length;

    let result = await EmployeeAvailable.save();
    successHandler(req, res, {
      data: result,
      message: "attendance creation success",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

const joinAttendance = async (req, res) => {
  try {
    let result = await employeeAvailable.aggregate([
      {
        $lookup: {
          from: "empdetails",
          localField: "employee",
          foreignField: "_id",
          as: "employee",
        },
      },{
        $unwind: "$employee"
      },
      {
        $lookup: {
          from: "empdetails",
          localField: "createdBy",
          foreignField: "_id",
          as: "emp",
        },
      },{
        $unwind: "$emp"
      }
    ]);
    successHandler(req, res, { data: result, message: "join" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

const attendanceList = async (req,res) => {
    try{
        let result = await employeeAvailable.find({});
        successHandler(req, res, { data: result, message: "view the all attendence" });
    }
    catch(err){
        errorHandler(req, res, err, 500);  
    }
}


module.exports = {
    createAttendance,
    joinAttendance,
    attendanceList 
}
