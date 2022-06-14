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
router.post('/joinVisitor',controller.joinVisitor)

//update
router.put('/update/:id',controller.updateVisitor)

//delete
router.delete('/delete/:id',controller.deleteVisitor)

module.exports = router;