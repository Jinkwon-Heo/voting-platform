const User = require('../../models/User');
const Vote = require('../../models/Vote');
const transformTimeFormat = require('../../util/transformTimeFormat');

exports.showMyVotes = async (req, res, next) => {
  const loggedInUserEmail = req.user.email;
  const userData = await User.findOne({ email: loggedInUserEmail });
  const populatedData = await Vote.find().populate('voteCreator');
  const presentTime = transformTimeFormat(new Date());

  const filteredData = populatedData.filter((data) => {
    if (data.voteCreator.email === userData.email) {
      return true;
    }
  });

  res.render('myVotes', { filteredData, presentTime });
}
