const mongoose = require("mongoose");
const dashboardSchema = new mongoose.Schema({
    userOnDuty: {
        type: Number,
    },
    totalUser: {
        type: Number,
    },
    enteredVisitors: {
        type: Number,
    },
    leftVisitors: {
        type: Number,
    },
    enteredVehicles: {
        type: Number,
    },
    leftVehicles: {
        type: Number,
    },
    date: {
        type: Date,
    }
});

module.exports = mongoose.model("dashboard",dashboardSchema)