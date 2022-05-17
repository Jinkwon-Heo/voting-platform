const User = require('../../models/User');
const Vote = require('../../models/Vote');

exports.showCreateVote = async (req, res, next) => {
  const loggedInUserEmail = req.session.passport.user;
  const userData = await User.findOne({ email: loggedInUserEmail });
  const populatedData = await Vote.find().populate('voteCreator');

  const filteredData = populatedData.filter((data) => {
    if (data.voteCreator.email === userData.email) {
      return true;
    }
  });

  console.log(filteredData);
  res.render('createVote');
}

exports.showSuccessPage = (req, res, next) => {
  res.render('success');
}

exports.createVote = async (req, res, next) => {
  try {
    const loggedInUserEmail = req.session.passport.user;
    const items = req.body.voteItems;
    const objectedItems = [];

    for (let i = 0; i < items.length; i++) {
      const objectedItem = {};
      objectedItem.item = items[i];
      objectedItems.push(objectedItem);
    }

    const userData = await User.findOne({ email: loggedInUserEmail });
    req.body.voteCreator = userData._id
    req.body.voteItems = objectedItems;
    const newVote = Vote(req.body);
    await newVote.save();
    res.render('success');
  } catch (error) {
    next(error);
  }
}
