const mongoose = require('mongoose');
const employeeAvailable = mongoose.model({
    date: {
        type: Date
    },
    employee: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
        }]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
    }
},{timestamps: true});

module.exports = mongoose.model("attendance",employeeAvailable);