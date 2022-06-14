const express = require("express");
// const app = express();
const appRoutes = express.Router();
const userRoutes = require('./users')
const authRoutes = require ('./auth')
const visitorRoutes = require('./visitor')
const vehicleRoutes = require('./vehicle')
const statusRoutes = require('./status')
const productRoutes = require('./product')
const roleRoutes = require('./role')
const dashboardRoutes = require('./dashboard')
const employeeAvailableRoutes = require('./employeeAvailable')
const addressRoutes = require('./address')
const countryRoutes = require('./country')



appRoutes.use('/users', userRoutes);
appRoutes.use('/auth', authRoutes);
appRoutes.use('/visitor',visitorRoutes);
appRoutes.use('/vehicle',vehicleRoutes);
appRoutes.use('/status',statusRoutes);
appRoutes.use('/product',productRoutes);
appRoutes.use('/role',roleRoutes);
appRoutes.use('/dashboard',dashboardRoutes);
appRoutes.use('/employeeAttendance',employeeAvailableRoutes);
appRoutes.use('/address',addressRoutes);
appRoutes.use('/country',countryRoutes);

// appRoutes.use('/auth',authentication);


module.exports = appRoutes;