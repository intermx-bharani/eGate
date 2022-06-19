const express = require("express");
const router = express.Router();

// const multer = require('multer')
// const employee = require("../models/empSchema");
// const { uploadFile } = require('../config/s3Upload')

const { controller } = require("./../controller");
const auth = require("../authenticate");
// const employeeAvailable = require("../models/employeeAvailable");

//create
router.post("/", auth.authenticateToken, controller.createUser);

//list
router.get("/list", auth.authenticateToken, controller.userList);

//view details
router.get("/view/:id", auth.authenticateToken, controller.getUsers);

//delete
router.delete("/delete/:id", auth.authenticateToken, controller.deleteUsers);

//softDelete
router.delete("/inActive/:id", auth.authenticateToken, controller.inActive);

//update
router.put("/view/update", auth.authenticateToken, controller.updateUser);

//search
router.post("/search", auth.authenticateToken, controller.searchUser);

//join
router.get("/joinemp", controller.joinEmployee);

// const upload = multer({dest: '../image'})
// router.put("/upload",upload.single('image'), async (req,res) => {
//     const file = req.file
//     const result = await uploadFile(file)
//     res.send("uploaded")
// });


module.exports = router;
