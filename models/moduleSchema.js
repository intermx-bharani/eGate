const mongoose = require("mongoose");
const moduleSchema = new mongoose.Schema({
    moduleName:{
        type: String
    },
    isActive:{
        type: Boolean
    },
    deletedAt:{
        type: Date
    },
    isDeleted:{
        type: Boolean
    },
})

module.exports = mongoose.model("module",moduleSchema)