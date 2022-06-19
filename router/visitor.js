const express = require("express");
const router = express.Router();

const { controller } = require("./../controller");
const auth = require("../authenticate");

//create
router.post("/", auth.authenticateToken, controller.createVisitor);

//visitorList
router.get("/lists", auth.authenticateToken, controller.visitorList);

//view details
router.get("/view/:id", auth.authenticateToken, controller.getVisitor);

// join
router.post("/joinVisitor", auth.authenticateToken, controller.joinVisitor);

//update
router.put("/update", auth.authenticateToken, controller.updateVisitor);

//delete
router.delete("/delete/:id", auth.authenticateToken, controller.deleteVisitor);

//search
router.post("/search", auth.authenticateToken, controller.searchVisitor);

module.exports = router;
