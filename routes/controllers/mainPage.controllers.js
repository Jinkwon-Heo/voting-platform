const User = require('../../models/User');
const Vote = require('../../models/Vote');
// const moment = require('moment');
const transformTimeFormat = require('../../util/transformTimeFormat');

exports.showMainPage = async function(req, res, next) {
  const populatedData = await Vote.find().populate('voteCreator');
  const presentTime = transformTimeFormat(new Date());
  res.render('mainPage', { populatedData, presentTime });
}
