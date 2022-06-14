const express = require ("express");
const router = express.Router();

const { controller } = require('./../controller')

router.post('/',controller.createAddress);

router.get('/country',controller.country);

module.exports = router;