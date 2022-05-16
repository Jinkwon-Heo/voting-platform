const express = require('express');
const router = express.Router();

const passport = require('passport');
const loginController = require('./controllers/login.controllers');

router.get('/', loginController.showLoginPage);
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
  // failureFlash: '입력한 정보를 확인해주세요',
  // successFlash: '로그인 성공!',
}));

module.exports = router;
