const express = require("express");
const router = express.Router();

const { controller } = require('./../controller')

//create
router.post('/:id', controller.createVehicle)

module.exports = router;