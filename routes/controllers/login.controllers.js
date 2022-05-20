exports.showLoginPage = (req, res, next) => {
  try {
    res.render('login', { error: req.flash('error')[0], message: req.flash('successSignup') });
  } catch (error) {
    next(error);
  }
};

exports.showCallbackUrlLoginPage = (req, res, next) => {
  try {
    res.render('callbackLogin', { callbackUrl: req.session.callbackUrl, error: req.flash('error')[0],});
  } catch (error) {
    next(error);
  }
};

exports.callbackLoginSuccess = (req, res) => {
  return res.redirect(`${req.session.callbackUrl}`);
};
