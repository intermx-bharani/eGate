const mongoose = require("mongoose");
var vehicleSchema  = new mongoose.Schema({
    visitorId:{
        type: mongoose.Schema.Types.ObjectId
        // ref: 'visitor'
    },
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
        ref: 'empDetails'
    },
},{timestamps: true});

module.exports = mongoose.model("vehicle", vehicleSchema);