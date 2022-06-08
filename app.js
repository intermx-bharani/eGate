const express = require('express');
const mongoose = require('mongoose');
const database = require("./config/mongo");
const dotenv = require('dotenv')
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const db = mongoose.connection;

const appRoutes = require("./router");
const { controller } = require('./controller');

app.use('/egate', appRoutes);
app.get('/', function(req, res, next) {
  res.send('Home page');
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
  });