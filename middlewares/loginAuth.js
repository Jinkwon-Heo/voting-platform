const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

module.exports = isAuthenticated;
