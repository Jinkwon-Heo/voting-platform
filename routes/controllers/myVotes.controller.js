const createError = require('http-errors');
const User = require('../../models/User');
const Vote = require('../../models/Vote');
const transformTimeFormat = require('../../util/transformTimeFormat');
const { getMyVotes } = require('../../services/getMyVotes');
const { INTERNAL_ERROR } = require('../../constants/errorMessage');

exports.showMyVotes = async (req, res, next) => {
  try {
    const loggedInUserEmail = req.user.email;
    const userData = await User.findOne({ email: loggedInUserEmail });
    const populatedData = await Vote.find().populate('voteCreator');
    const presentTime = transformTimeFormat(new Date());

    const filteredData = getMyVotes(populatedData, userData);

    res.render('myVotes', { filteredData, presentTime });
  } catch (error) {
    next(createError(500, INTERNAL_ERROR));
  }

}
