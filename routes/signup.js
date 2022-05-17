const express = require('express');
const router = express.Router();
const signupController = require('./controllers/signup.controller');

router.get('/', signupController.signupPage);
router.post('/', signupController.join);

module.exports = router;
