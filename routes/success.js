const express = require('express');
const router = express.Router();
const successController = require('./controllers/success.controller');

router.get('/', successController.showSuccessPage);

module.exports = router;
