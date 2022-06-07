const express = require("express");
const router = express.Router();

const { controller } = require('./../controller')
//login
router.post('/login',
    controller.login
);

//forget
router.post('/forget',
    controller.forget
);

//change
router.patch('/change',
    controller.change
);

module.exports = router;
