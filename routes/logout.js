const express = require('express');
const router = express.Router();
const logoutControllers = require('./controllers/logout.controllers');
const isAuthenticated = require('../middlewares/loginAuth');

router.post('/', isAuthenticated, logoutControllers.logout);

module.exports = router;
