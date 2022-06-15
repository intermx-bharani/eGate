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
    },
    purpose:{
        type: String
    },
    approvedBy:{
        type: mongoose.Schema.Types.ObjectId, 
    },
    vehicleId:{
        type: mongoose.Schema.Types.ObjectId
    },
    visitorIDPhoto:{
        type: String
    },
    status:{
        type: mongoose.Schema.Types.ObjectId
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId
    },
    productDetails:{
        type: mongoose.Schema.Types.ObjectId,
    },
    empId:{
        type: mongoose.Schema.Types.ObjectId
    },
    date:{
        type: Date
    }

},{timestamps: true});

module.exports = mongoose.model("visitor", visitorSchema);