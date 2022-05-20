const createError = require('http-errors');
const { INTERNAL_ERROR } = require('../../constants/errorMessage');

exports.showPlainLoginPage = (req, res, next) => {
  try {
    res.render('login', { error: null, message: null} );
  } catch (error) {
    next(error);
  }
}

exports.showLoginPage = (req, res, next) => {
  try {
    res.render('login', { error: req.flash('error')[0], message: req.flash('successSignup') });
  } catch (error) {
    next(createError(500, INTERNAL_ERROR));
  }
};

exports.showCallbackUrlLoginPage = (req, res, next) => {
  try {
    res.render('callbackLogin', { callbackUrl: req.session.callbackUrl, error: req.flash('error')[0],});
  } catch (error) {
    next(createError(500, INTERNAL_ERROR));
  }
};

exports.callbackLoginSuccess = (req, res) => {
  return res.redirect(`${req.session.callbackUrl}`);
};
