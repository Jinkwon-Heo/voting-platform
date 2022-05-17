const express = require('express');
const router = express.Router();

const passport = require('passport');
const loginController = require('./controllers/login.controllers');
const onlyNotLoggedInCanView = require('../middlewares/loginAuth');

router.get('/', loginController.showLoginPage);
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
}));

module.exports = router;
