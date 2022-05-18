const express = require('express');
const router = express.Router();
const mainPageControllers = require('./controllers/mainPage.controllers');

router.get('/', mainPageControllers.showMainPage);

module.exports = router;
