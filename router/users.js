const express = require("express");
const router = express.Router();
// const employee = require("../models/empSchema");
// const role = require("../models/roles");

// const { required } = require("nodemon/lib/config");

const { controller } = require('./../controller')
const auth = require('../authenticate')

//create
router.post('/',auth.authenticateToken, controller.createUser)

//list
router.get('/list',controller.userList)


//view details
router.get('/view/:id', controller.getUsers)


//delete
router.delete('/delete/:id',controller.deleteUsers)

//softDelete
router.patch('/inActive/:id',controller.inActive)

// router.delete('/softDelete/:id', controller.softDelete)



//update
router.put('/view/update/:id',controller.updateUser)

//search
router.post('/search',controller.searchUser)

//join
router.get('/joinemp',controller.joinEmployee)




console.log("hello");

module.exports = router;