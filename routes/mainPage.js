const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const User = require('../models/User');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // console.log(await User.find());

  // const loggedInUserEmail = req.session.passport.user;
  // const userData = await User.findOne({ loggedInUserEmail });
  // const populatedData = await Vote.find().populate('voteCreator');

  // console.log(userData);

  // const filteredData = populatedData.filter((data) => {
  //   if (data.voteCreator.email === userData.email) {
  //     return true;
  //   }
  // });

  // console.log(filteredData);

  res.render('mainPage');
});

module.exports = router;
