const visitor = require("../models/visitorSchema");
const product = require("../models/productSchema");
const s3 = require("../config/s3Upload");

const { errorHandler, successHandler } = require("./../helper/handlers");

const hasAccess = (roles = [], user = {}) => {
  return roles.includes(user.roleName);
};
const requiredRole = ["security","security Manager","admin"];

// create

const createVisitor = async (req, res) => {
  try {
    let loginUser = req.user;
    console.log(loginUser);
    let access = hasAccess(requiredRole, loginUser);
    if (!access) {
      return errorHandler(req, res, { message: "invalid" }, 500);
    }

    const Visitor = new visitor();
    const Product = new product();

    Visitor.name = req.body.name;
    Visitor.email = req.body.email;
    Visitor.visitorType = req.body.visitorType;
    Visitor.QRNumber = req.body.QRNumber;
    Visitor.address = req.body.address;
    Visitor.contactNo = req.body.contactNo;
    Visitor.companyName = req.body.companyName;
    Visitor.checkIn = req.body.checkIn;
    Visitor.checkOut = req.body.checkOut;
    Visitor.visitTo = req.body.visitTo;
    Visitor.purpose = req.body.purpose;
    Visitor.approvedBy = req.body.approvedBy;
    Visitor.status = req.body.status;
    Visitor.vehicleId = req.body.vehicleId;
    Visitor.empId = req.body.empId;
    Visitor.date = new Date(req.body.date);
    Visitor.visitorIDPhoto = req.body.visitorIDPhoto;
    // console.log(visitorIDPhoto)
    Visitor.createdBy = req.body.createdBy;
    Visitor.updatedBy = req.body.updatedBy;
    Visitor.productDetails = req.body.productDetails;
    let result = await Visitor.save();
    
    successHandler(req, res, {
      data: result,
      message: "visitor creation success",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

const joinVisitor = async (req, res) => {
  try {
    let result = await visitor.aggregate([
      {
        $lookup: {
          from: "empdetails",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },{
        $unwind: '$createdBy'
      },
      {
        $lookup: {
          from: "empdetails",
          localField: "approvedBy",
          foreignField: "_id",
          as: "ApprovedBy",
        },
      },{
        $unwind: "$ApprovedBy"
      },
      {
        $lookup: {
          from: "status",
          localField: "status",
          foreignField: "_id",
          as: "status",
        },
      },{
        $unwind: "$status"
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "vehicleId",
          foreignField: "_id",
          as: "vehicle",
        },
      },{
        $unwind: "$vehicle"
      },
      {
        $lookup: {
          from: "products",
          localField: "productDetails",
          foreignField: "_id",
          as: "product",
        },
      },{
        $unwind: "$product"
      }
    ]);
    successHandler(req, res, { data: result, message: "success" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//list

const visitorList = async (req, res) => {
  try {
    let result = await visitor.find({});
    successHandler(req, res, {
      data: result,
      message: "view the visitor details",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//view details

const getVisitor = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await visitor.find({ _id: id });
    successHandler(req, res, {
      data: result,
      message: "view the visitor details",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//update

const updateVisitor = async (req, res) => {
  try {
    const id = req.body._id;
    let result = await visitor.findByIdAndUpdate({ _id: id }, req.body);
    successHandler(req, res, { Employee: result, message: "update" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//delete

const deleteVisitor = async (req, res) => {
  try {
    const id = req.params.id;
    // const userId = req.params.userId;
    let result = await visitor.findByIdAndDelete({ _id: id });
    successHandler(req, res, { Employee: result, message: "delete the user" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//search

const searchVisitor = async (req,res) => {
  try{
    const data = req.body.name;
    const data2 = req.body.email;
    let result = await visitor.find(
      {
        $or: [
          { name: { $regex: `${data}`}},
          { email: { $regex: `${data2}`}},
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
  createVisitor,
  visitorList,
  getVisitor,
  joinVisitor,
  deleteVisitor,
  updateVisitor,
  searchVisitor
};
