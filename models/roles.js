const mongoose = require("mongoose");
var roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
    },
    deletedAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
    },
});

module.exports = mongoose.model("role",roleSchema);