exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    req.session;
  });
  res.redirect("/login");
}
