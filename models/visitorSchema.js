const mongoose = require("mongoose");
var visitorSchema  = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    visitorType:{
        type: String
    },
    QRNumber:{
        type: String
    },
    address:{
        type: String
    },
    contactNo:{
        type: String
    },
    companyName:{
        type: String
    },
    checkIn:{
        type: Date
    },
    checkOut:{
        type: Date
    },
    visitTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empDetails'
    },
    purpose:{
        type: String
    },
    apporvedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empDetails' 
    },
    vehicleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle'
    },
    visitorIDPhoto:{
        type: String
    },
    createdBy:{
        type: String
    },
    updatedBy:{
        type: String
    },
    productDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
},{timestamps: true});

module.exports = mongoose.model("visitor", visitorSchema);