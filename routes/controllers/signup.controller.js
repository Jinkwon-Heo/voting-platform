const User = require('../../models/User');

exports.signupPage = async (req, res, next) => {
  try {
    console.log(req.user);
    res.render('signup', { error: null, email: null, username: null });
  } catch(error) {
    next(error);
  }
}

exports.join = async (req, res, next) => {
  console.log(req.user);
  const { username, email, password, password2 } = req.body;
  const isEmailValidate = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const hasSymbolCharacter = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
  const hasSpace = /[\s]/g;

  if (!isEmailValidate.test(email)) {
    console.log('잘못된 이메일 주소');
    req.flash('error', '잘못된 이메일 주소입니다.');
    res.status(400);

    return res.render('signup', { error: req.flash('error')[0], email, username });
  }

  if (hasSymbolCharacter.test(username)) {
    console.log('이름에는 특수문자 불가');
    req.flash('error', '이름에는 특수문자가 들어갈 수 없습니다.');
    res.status(400);

    return res.render('signup', { error: req.flash('error')[0], email, username });
  }

  if (hasSpace.test(username)) {
    console.log('이름에는 공백 불가');
    req.flash('error', '이름에는 공백이 들어갈 수 없습니다.');
    res.status(400);

    return res.render('signup', { error: req.flash('error')[0], email, username });
  }

  if (password !== password2) {
    console.log('비밀번호 확인 불일치');
    req.flash('error', '패스워드가 일치하지 않습니다');
    res.status(400);

    return res.render('signup', { error: req.flash('error')[0], email, username });
  } else {
    // 사용자 등록
    try {
      console.log('사용자 등록');
      const user = await User({ username, email });
      await User.register(user, password);
      console.log(123123);
      // req.flash('successSignup', '회원가입 성공! 로그인 해주세요.');

      return res.render('login');
    } catch (error) {
      console.log('에러발생 이미 존재하는 id입니다.');
      req.flash('error', '이미 존재하는 Email 입니다');

      return res.render('signup', { error: req.flash('error')[0], email, username });
    }
  }
}
