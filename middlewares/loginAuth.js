const onlyNotLoggedInCanView = (req, res, next) => {
  if (req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

const onlyLoggedInCanView = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = onlyLoggedInCanView;
module.exports = onlyNotLoggedInCanView;
