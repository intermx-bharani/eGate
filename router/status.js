const express = require("express");
const router = express.Router();

const { controller } = require('./../controller')

router.post('/',controller.createStatus);

router.get('/listStatus',controller.listStatus);

module.exports = router;