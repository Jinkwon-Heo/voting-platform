const User = require('../../models/User');
const { inputValidationCheck } = require('../../services/inputValidationCheck');

exports.signupPage = async (req, res, next) => {
  try {
    res.render('signup', { error: null, email: null, username: null });
  } catch(error) {
    next(error);
  }
}

exports.join = async (req, res, next) => {
  const { username, email, password } = req.body;
  const isInputValidate = inputValidationCheck(req.body);
  const { status, message } = isInputValidate;

  if (status === 'invalid') {
    req.flash(status, message);
    res.status(400);

    return res.render('signup', { error: req.flash(status)[0], email, username });
  }

  try {
    const user = await User({ username, email });
    await User.register(user, password);
    req.flash('successSignup', '회원가입 성공! 로그인 해주세요.');

    return res.redirect('/login');
  } catch (error) {
    req.flash('error', '이미 존재하는 Email 입니다');

    return res.render('signup', { error: req.flash('error')[0], email, username });
  }
}
