const Vote = require('../../models/Vote');
const transformTimeFormat = require('../../util/transformTimeFormat');
const { sortVoteList } = require('../../services/sortVoteList');

exports.showMainPage = async function(req, res, next) {
  try {
    const voteData = await Vote.find().populate('voteCreator');
    const presentTime = transformTimeFormat(new Date());
    const isLoggedInUser = req.user;

    const sortedVotes = sortVoteList(voteData, presentTime);

    const votedFlash = req.flash('voteSuccess')[0];
    const createdFlash = req.flash('voteCreated')[0];
    let flashMessage = null;

    if (votedFlash) {
      flashMessage = votedFlash;
    } else {
      flashMessage = createdFlash;
    }

    res.render('mainPage', {
      sortedVotes,
      presentTime,
      isLoggedInUser,
      message: flashMessage,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
