exports.logout = (req, res, next) => {
  req.logout();
  req.session.destroy(()=>{
    req.session;
  });
  res.redirect('/login');
}
