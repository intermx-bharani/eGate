const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    doorNo:{
        type: Number
    },
    streetName:{
        type: String
    },
    areaName:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    country:{
        type: mongoose.Schema.Types.ObjectId,
    },

});

module.exports = mongoose.model("address",addressSchema)