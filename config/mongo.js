const mongoose = require('mongoose');
require('dotenv').config()

var database = mongoose.connect(process.env.MONGODB_URL,

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