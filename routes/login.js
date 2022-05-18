const express = require('express');
const router = express.Router();

const passport = require('passport');
const loginController = require('./controllers/login.controllers');

router.get('/', loginController.showLoginPage);
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
  failureFlash: { type: 'error', message: '이메일주소 혹은 비밀번호를 확인해주세요. (CapsLock이 켜져있나요?)' },
}));
router.get('/callback', loginController.showCallbackUrlLoginPage)
router.post('/callback', passport.authenticate('local',
  { failureRedirect: '/login/callback',
    failureFlash: { type: 'error', message: '이메일주소 혹은 비밀번호를 확인해주세요. (CapsLock이 켜져있나요?)' },
  }),
  loginController.callbackLoginSuccess);

module.exports = router;
