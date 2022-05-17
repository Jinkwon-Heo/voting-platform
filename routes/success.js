const express = require('express');
const router = express.Router();
const successController = require('./controllers/success.controller');
const isAuthenticated = require('../middlewares/loginAuth');

router.get('/', isAuthenticated, successController.showSuccessPage);

module.exports = router;
