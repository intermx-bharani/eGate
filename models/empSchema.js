const mongoose = require("mongoose");
// var { softDeletePlugin }  = require ('soft-delete-plugin-mongoose');
// const softDelete = require ('mongoosejs-soft-delete');
var empSchema = new mongoose.Schema({
    empId: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
    },
    department: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
    },
    contactNo: {
        type: Number,
    },
    employeeImage: {
        type: String,
    },
    roleName:{
        type:String,
    }

},{timestamps: true});

// empSchema.plugin(softDelete);

module.exports = mongoose.model("empDetails", empSchema);