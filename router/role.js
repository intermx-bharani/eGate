const express = require("express");
const router = express.Router();

const { controller } = require('./../controller')

router.post('/',controller.createRole);

router.get('/listRole',controller.list);

module.exports = router;

