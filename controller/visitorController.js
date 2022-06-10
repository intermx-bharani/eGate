const employee = require("../models/empSchema");
const visitor = require("../models/visitorSchema");
const vehicle = require("../models/vehicleSchema");
const product = require("../models/productSchema");
const lib = require ("../controller/visitorController")

const { errorHandler, successHandler } = require('./../helper/handlers');
const { db } = require("../models/empSchema");

// create
const createVisitor = async (req,res) => {
    try{
        const Employee = new employee();
        const Vehicle = new vehicle();
        const Visitor = new visitor();
        const Product = new product();

        Product.invoiceNumber = req.body.invoiceNumber;
        Product.poNumber = req.body.poNumber;
        Product.productCode = req.body.productCode;
        Product.productName = req.body.productName;
        Product.modelNumber = req.body.modelNumber;
        Product.invoicePhoto = req.body.invoicePhoto;
        Product.vendorName = req.body.vendorName;
        Product.save()

        
        Visitor.name = req.body.name;
        Visitor.email = req.body.email;
        Visitor.visitorType = req.body.visitorType;
        Visitor.QRNumber = req.body.QRNumber;
        Visitor.address = req.body.address;
        Visitor.contactNo = req.body.contactNo;
        Visitor.companyName = req.body.companyName;
        Visitor.checkIn = req.body.checkIn;
        Visitor.checkOut = req.body.checkOut;
        Visitor.visitTo = req.body.empId;
        Visitor.purpose = req.body.purpose;
        Visitor.approvedBy = req.body.empId;
        Visitor.vehicleId = req.body.vehicleId;
        Visitor.empId = req.body.empId;
        // Visitor.visitorIDPhoto = req.body.visitorIDPhoto;
        // console.log(visitorIDPhoto)
        Visitor.createdBy = req.body.empId;
        Visitor.updatedBy = req.body.empId;
        Visitor.productDetails = Product._id;
        let result = await Visitor.save()
        console.log(result)
        successHandler(req, res, { data: result, message: 'user creation success'})

    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}

const join = async (req,res) => {
  try{
      let result = await visitor.aggregate([
          {
              $lookup:{
                  from:"vehicles",
                  localField:"vehicleId",
                  foreignField:"_id",
                  as:"vehicle",
              },  
           
          },{
            $unwind: '$vehicle'
          },        
           {
            $lookup:{
                from:"empdetails",
                localField:"empId",
                foreignField:"_id",
                as:"employeeDetails",
            },   
        },{
            $unwind: '$employeeDetails'
        }
      ])
      successHandler(req, res, { data: result, message: 'join'})
  } 
  catch(err){
    errorHandler(req, res, err, 500);
  }
}


//list

const visitorList = async (req,res) => {
    try{
        let result = await visitor.find({})
        successHandler(req, res, { data: result, message: 'view the visitor details'})
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}

//view details

const getVisitor = async (req,res) => {
    try{
        const id =req.params.id;
        let result = await visitor.find({_id:id})
        successHandler(req,res, {data:result,message: 'view the visitor details'})
    }
    catch(err){
        errorHandler(req,res,err,500);
    }
}

//update
const updateVisitor = async (req,res) =>{
    console.log("update")
        try{
            const id =req.body._id;
            console.log(id)
            let result = await visitor.updateOne({_id:id},req.body)
            successHandler(req, res, { Employee: result, message: 'update'})
        }
        catch(err){
            errorHandler(req, res, err, 500)
        }
    }


//delete

const deleteVisitor = async (req,res) => {
    try{
        const id =req.params.id;
        // const userId = req.params.userId;
        let result = await visitor.findByIdAndDelete({_id: id})
        successHandler(req, res, { Employee: result, message: 'delete the user'})
    }
    catch(err){
        errorHandler(req, res, err, 500)
    }
}
module.exports = {
    createVisitor,visitorList,getVisitor,join,deleteVisitor,updateVisitor
}