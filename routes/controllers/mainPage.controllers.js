const Vote = require('../../models/Vote');
const transformTimeFormat = require('../../util/transformTimeFormat');

exports.showMainPage = async function(req, res, next) {
  try {
    const voteData = await Vote.find().populate('voteCreator');
    const presentTime = transformTimeFormat(new Date());
    const isLoggedInUser = req.user;
    const expiredVotes = [];

    for (let i = 0; i < voteData.length; i++) {
      if (voteData[i].expireTime < presentTime) {
        expiredVotes.push(voteData[i]);
      }
    }

    //service layer만들어서 옮기기.
    const proceedingVotes = voteData.filter(item => !expiredVotes.includes(item));
    proceedingVotes.sort((prev, next) => {
      if (prev.expireTime > next.expireTime) {
        return 1;
      }

      if (prev.expireTime < next.expireTime) {
        return -1;
      }

      return 0;
    });

    const sortedVotes = proceedingVotes.concat(expiredVotes);

    res.render('mainPage', {
      sortedVotes,
      presentTime,
      isLoggedInUser,
      message: req.flash('voteCreated'),
    });
  } catch (error) {
    next(error);
  }
};
