const employee = require("../models/empSchema");
const vehicle = require("../models/vehicleSchema");

const { errorHandler, successHandler } = require("./../helper/handlers");
//create
const createVehicle = async (req, res) => {
  try {
    const Vehicle = new vehicle();
    console.log("kaviya");
    Vehicle.vehicleNumber = req.body.vehicleNumber;
    Vehicle.vehicleType = req.body.vehicleType;
    Vehicle.vehiclePhoto = req.body.vehiclePhoto;
    Vehicle.authorizedPerson = req.body.authorizedPerson;
    Vehicle.status = req.body.status
    Vehicle.createdBy = req.body.empId;
    Vehicle.updatedBy = req.body.empId;
    Vehicle.approvedBy = req.body.approvedBy;
    Vehicle.empId = req.body.empId;
    Vehicle.date = new Date(req.body.date);
    let result = await Vehicle.save();
    successHandler(req, res, {
      data: result,
      message: "vehicle creation success",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//join
const joinVehicle = async (req, res) => {
  try {
    let result = await vehicle.aggregate([
      {
        $lookup: {
          from: "empdetails",
          localField: "empId",
          foreignField: "_id",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails",
      },
      {
        $lookup: {
          from: "status",
          localField: "status",
          foreignField: "_id",
          as: "status",
        },
      },
      {
        $unwind: "$status",
      },
    ]);
    successHandler(req, res, { data: result, message: "join" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//list

const vehicleList = async (req, res) => {
  try {
    let result = await vehicle.find({});
    successHandler(req, res, {
      data: result,
      message: "view the visitor details",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//view details

const getvehicle = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await vehicle.find({ _id: id });
    successHandler(req, res, {
      data: result,
      message: "view the visitor details",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//update
const updateVehicle = async (req, res) => {
  console.log("update");
  try {
    const id = req.body._id;
    console.log(id);
    let result = await vehicle.updateOne({ _id: id }, req.body);
    successHandler(req, res, { Employee: result, message: "update" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//delete

const deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    // const userId = req.params.userId;
    let result = await vehicle.findByIdAndDelete({ _id: id });
    successHandler(req, res, { Employee: result, message: "delete the user" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//search
const searchVehicle = async (req,res) => {
  try{
    const data =req.body;
    let result = await vehicle.find(
      {
        $or: [
            { vehicleNumber: {$regex: `${data}`} },
        ],
      }
    );
    successHandler(req, res, { data: result, message: "search" });
  }
  catch(err){
    errorHandler(req, res, err, 500);
  }
}

module.exports = {
  createVehicle,
  vehicleList,
  getvehicle,
  updateVehicle,
  deleteVehicle,
  joinVehicle,
  searchVehicle
};
