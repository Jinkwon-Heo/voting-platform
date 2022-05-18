exports.showLoginPage = (req, res, next) => {
  try {
    const flashErrorMessage = req.flash('error')[0];

    if (flashErrorMessage) {
      return res.render('login', { error: flashErrorMessage, message: null });
    }

    res.render('login', { error: null, message: req.flash('successSignup') });
  } catch (error) {
    next(error);
  }
};

exports.showCallbackUrlLoginPage = (req, res, next) => {
  try {
    const flashErrorMessage = req.flash('error')[0];

    if (flashErrorMessage) {
      return res.render('callbackLogin', {
        callbackUrl: req.session.callbackUrl,
        error: flashErrorMessage,
      });
    }

    res.render('callbackLogin', {
      callbackUrl: req.session.callbackUrl,
      error: null
    });
  } catch (error) {
    next(error);
  }
};

exports.callbackLoginSuccess = (req, res) => {
  return res.redirect(`${req.session.callbackUrl}`);
};
