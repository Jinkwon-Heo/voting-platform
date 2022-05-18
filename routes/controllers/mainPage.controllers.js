const Vote = require('../../models/Vote');
const transformTimeFormat = require('../../util/transformTimeFormat');

exports.showMainPage = async function(req, res, next) {
  try {
    const populatedData = await Vote.find().populate('voteCreator');
    const presentTime = transformTimeFormat(new Date());
    const isLoggedInUser = req.user;
    res.render('mainPage', { populatedData, presentTime, isLoggedInUser, message: req.flash('voteCreated') });
  } catch (error) {
    next(error);
  }
};
