const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const User = require('../models/User');
const onlyLoggedInCanView = require('../middlewares/loginAuth');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('mainPage');
});

module.exports = router;
