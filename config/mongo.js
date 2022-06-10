const mongoose = require('mongoose');
const { employee } = require('../models/empSchema');
const { role } = require('../models/roles');

var database = mongoose.connect("mongodb+srv://kaviya:kaviya06*@cluster0.xtrbtcx.mongodb.net/?retryWrites=true&w=majority/eGate",

{
    useNewUrlParser: true,

}
);

if (process.env.NODE_ENV === 'production') {
    database = process.env.MONGOLAB_URI;
}
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", function() {
    console.log("connected successfully");
});

module.exports = database;