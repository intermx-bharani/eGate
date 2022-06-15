const mongoose = require("mongoose");
const accessRightSchema = new mongoose.Schema({
    role:{
        type: mongoose.Schema.Types.ObjectId
    },
    module:{
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model("accessRight",accessRightSchema)
