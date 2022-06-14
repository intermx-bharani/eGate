const mongoose = require("mongoose");
var vehicleSchema  = new mongoose.Schema({
    vehicleNumber:{
        type: String
    },
    vehicleType:{
        type: String
    },
    vehiclePhoto:{
        type: String
    },
    authorizedPerson:{
        type: String
    },
    createdBy:{
        type: String
    },
    updatedBy:{
        type: String
    },
    approvedBy:{
        type: mongoose.Schema.Types.ObjectId,
    },
    empId:{
        type: mongoose.Schema.Types.ObjectId
    },
    status:{
        type: mongoose.Schema.Types.ObjectId  
    }
},{timestamps: true});

module.exports = mongoose.model("vehicle", vehicleSchema);