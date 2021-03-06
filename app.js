const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');   
const database = require("./config/mongo");
require('dotenv').config()
const bodyparser = require("body-parser");
const multer = require("multer")


const app = express();
app.use(morgan())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const db = mongoose.connection;

const appRoutes = require("./router");
const { controller } = require('./controller');
// const { errorHandler, successHandler } = require("./../helper/handlers");

app.use('/egate', appRoutes);





app.get('/', function(req, res, next) {
  res.send('Home page');
});

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("http://localhost:5000");
  });