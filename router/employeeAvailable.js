const express = require("express");
const router = express.Router();

const { controller } = require('./../controller')

router.post('/',controller.createAttendance)

router.get('/listAttendance',controller.attendanceList)

router.get('/joinAttendance',controller.joinAttendance)

module.exports = router