const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/loginAuth');
const mainPageControllers = require('./controllers/mainPage.controllers');

router.get('/', mainPageControllers.showMainPage);

module.exports = router;
