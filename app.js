const express = require('express');
const mongoose = require('mongoose');
// const database = require("./config/mongo");
// const dotenv = require('dotenv')
const port = process.env.PORT || 3000;
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const db = mongoose.connection;

const appRoutes = require("./router");

app.use('/egate', appRoutes);

app.listen(port, () => {
    console.log("http://localhost:3000");
  });