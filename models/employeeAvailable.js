const mongoose = require('mongoose');
const employeeAvailableSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    employee: {
        type: [
            mongoose.Schema.Types.ObjectId,
        ]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    count:{
        type: Number
    }
},{timestamps: true});

module.exports = mongoose.model("attendance",employeeAvailableSchema);