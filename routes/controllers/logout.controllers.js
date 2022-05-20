const createError = require('http-errors');
const { INTERNAL_ERROR } = require('../../constants/errorMessage');

exports.logout = (req, res, next) => {
  try {
    req.logout();
    req.session.destroy(() => {
      req.session;
    });
    res.redirect('/login/plain');
  } catch (error) {
    next(createError(500, INTERNAL_ERROR));
  }
};
