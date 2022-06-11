const express = require("express");
const router = express.Router();

const { controller } = require('./../controller')
//create
router.post('/',controller.createProduct);
//list
router.get('/list',controller.list);
//view
router.get('/view/:id',controller.view)
//update
router.put('/update/:id', controller.updateProduct)
//delete
router.delete('/delete/:id',controller.deleteProduct)

module.exports = router;