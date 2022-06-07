const mongoose = require('mongoose');
const { employee } = require('../models/empSchema');
const { role } = require('../models/roles');

const database = mongoose.connect("mongodb://localhost:27017/eGate",

{
    useNewUrlParser: true,

}
);
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", function() {
    console.log("connected successfully");
});

module.exports = database;