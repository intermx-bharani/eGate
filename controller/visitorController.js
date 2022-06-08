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
        // let k = Employee.save()
        // console.log(k)

        // Vehicle.vehicleNumber = req.body.vehicleNumber;
        // Vehicle.vehicleType = req.body.vehicleType;
        // Vehicle.vehiclePhoto = req.body.vehiclePhoto;
        // Vehicle.authorizedPerson = req.body.authorizedPerson;
        // Vehicle.createdBy = req.body.createdBy;
        // Vehicle.updatedBy = req.body.updatedBy;
        // Vehicle.approvedBy = Employee._id;
        // Vehicle.save()

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
        Visitor.visitTo = Employee._id;
        Visitor.purpose = req.body.purpose;
        Visitor.approvedBy = Employee._id;
        Visitor.vehicleId = Vehicle._id;
        // Visitor.visitorIDPhoto = req.body.visitorIDPhoto;
        // console.log(visitorIDPhoto)
        Visitor.createdBy = Employee._id;
        Visitor.updatedBy = Employee._id;
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
                  from:"vehicle",
                  localField:"_id",
                  foreignField:"visitorId",
                  as:"vehicle",
              },  
            //   console.log(vehicleId)  
           
          },{
              $unwind: "$vehicle"
          }
      ])
      successHandler(req, res, { data: result, message: 'join'})
  } 
  catch(err){
    errorHandler(req, res, err, 500);
  }
}

// const visitors = async (req,res) => {
//     db.visitor.create(req.body)
//     .then(function(dbvisitor){
//         res.json(dbvisitor);
//     })
//     .catch(function(err){
//         res.json(err);
//     })
// }

// const join = async (req,res) => {
//    await db.vehicle.create(req,body) 
//     .then(function(dbvehicle){
//         return db.visitor.findOneUpdate({_id: req.params.id},{vehicle: dbvehicle._id},{new: true});
//     })
//     .then(function (dbvisitor){
//         res.json(dbvisitor);
//     })
//     .catch(function(err){
//         res.json(err)
//     });
// }

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