const employeeAvailable = require("../models/employeeAvailable");

const { errorHandler, successHandler } = require("./../helper/handlers");

//create
const createAttendance = async (req, res) => {
  try {
    let EmployeeAvailable = new employeeAvailable();

    EmployeeAvailable.date = req.body.date;
    EmployeeAvailable.employee = req.body.employee;
    EmployeeAvailable.createdBy = req.body.createdBy;

    let result = await EmployeeAvailable.save();
    successHandler(req, res, {
      data: result,
      message: "attendance creation success",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

const join = async (req, res) => {
  try {
    let result = await employeeAvailable.aggregate([
      {
        $lookup: {
          from: "attendances",
          localField: "employee",
          foreignField: "_id",
          as: "employee",
        },
      },
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
    join,
    attendanceList 
}
