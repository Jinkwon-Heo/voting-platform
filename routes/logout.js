const express = require('express');
const router = express.Router();
const logoutControllers = require('./controllers/logout.controllers');
const onlyLoggedInCanView = require('../middlewares/loginAuth');

router.post('/', onlyLoggedInCanView, logoutControllers.logout);

module.exports = router;
