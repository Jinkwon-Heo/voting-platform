const express = require('express');
const router = express.Router();
const successController = require('./controllers/success.controller');
const onlyLoggedInCanView = require('../middlewares/loginAuth');

router.get('/', onlyLoggedInCanView, successController.showSuccessPage);

module.exports = router;
