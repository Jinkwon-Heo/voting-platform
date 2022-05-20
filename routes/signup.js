const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const signupController = require('./controllers/signup.controller');

router.get('/', isLoggedIn, signupController.signupPage);
router.post('/', signupController.join);

module.exports = router;
