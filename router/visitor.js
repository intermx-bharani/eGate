const express = require("express");
const router = express.Router();

const { controller } = require('./../controller')

//create
router.post('/', controller.createVisitor)

//visitorList
router.get('/lists',controller.visitorList)

//view details
router.get('/view/:id',controller.getVisitor)

// join
router.post('/join',controller.join)

//update
router.put('/update/:id',controller.updateVisitor)

module.exports = router;