const express = require('express');
const router = express.Router();

const passport = require('passport');
const loginController = require('./controllers/login.controllers');

router.get('/', loginController.showLoginPage);
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
  failureFlash: { type: 'error', message: 'Invalid username or password.' },
}));
router.get('/callback', loginController.showCallbackUrlLoginPage)
router.post('/callback', passport.authenticate('local',
  { failureRedirect: '/login/callback',
    failureFlash: { type: 'error', message: 'Invalid username or password.' },
  }),
  loginController.callbackLoginSuccess);

module.exports = router;
