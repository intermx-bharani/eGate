const express = require("express");
const router = express.Router();

const { controller } = require('./../controller')

router.post('/attendance/:date',controller.dailyAttendance)

router.post('/employeeCount',controller.employeeActive)

router.post('/visitorEntry',controller.visitorEntry)

router.post('/visitorCount/:id',controller.visitorIn)

router.post('/visitorCount2/:id',controller.visitorOut)

router.post('/vehicleEntry',controller.vehicleEntry)

router.post('/vehicleCount/:id',controller.vehicleIn)

router.post('/vehicleCount2/:id',controller.vehicleOut)


module.exports = router