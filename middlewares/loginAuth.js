const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(301).redirect('/login/plain');
  }
};

module.exports = isAuthenticated;
