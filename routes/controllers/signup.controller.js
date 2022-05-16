const User = require('../../models/User');

exports.signupPage = async (req, res, next) => {
  try {
    res.render("signup");
  } catch(error) {
    next(error);
  }
}

exports.join = async (req, res, next) => {
  const { username, email, password, password2 } = req.body;
  if (password !== password2) {
    // req.flash('error', '패스워드가 일치하지 않습니다');
    //패스워드가 일치하지 않다는 상태 코드(status code) 전달
    res.status(400);
    res.render('signup');
  } else {
    // 사용자 등록
    try {
      const user = await User({ username, email });
      await User.register(user, password);
      // req.flash('successJoinId', '회원가입 성공');
      res.render('login');
    } catch (error) {
      // req.flash('error', '이미 존재하는 ID 입니다')
      console.log(error)
      res.render('signup', { pageTitle: 'signup' })
    }
  }
}
