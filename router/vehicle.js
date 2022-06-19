const express = require("express");
const router = express.Router();

const { controller } = require("./../controller");
const auth = require("../authenticate");

//create
router.post("/", auth.authenticateToken, controller.createVehicle);

// join
router.post("/join", auth.authenticateToken, controller.joinVehicle);

// vehicleList
router.get("/list", auth.authenticateToken, controller.vehicleList);

// view
router.get("/view/:id", auth.authenticateToken, controller.getvehicle);

//update
router.put("/update/:id", auth.authenticateToken, controller.updateVehicle);

//delete
router.delete("/delete/:id", auth.authenticateToken, controller.deleteVehicle);

//search
router.post("/search", auth.authenticateToken, controller.searchVehicle);

module.exports = router;
