const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/loginAuth');
const mainPageControllers = require('./controllers/mainPage.controllers');

/* GET home page. */
router.get('/', isAuthenticated, mainPageControllers.showMainPage);

module.exports = router;
