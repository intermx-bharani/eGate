const express = require("express");
// const app = express();
const appRoutes = express.Router();
const userRoutes = require('./users')
const authRoutes = require ('./auth')
const visitorRoutes = require('./visitor')
const vehicleRoutes = require('./vehicle')

appRoutes.use('/users', userRoutes);
appRoutes.use('/auth', authRoutes);
appRoutes.use('/visitor',visitorRoutes);
appRoutes.use('/vehicle',vehicleRoutes);
// appRoutes.use('/auth',authentication);


module.exports = appRoutes;