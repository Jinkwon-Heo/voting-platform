const createError = require('http-errors');
const { INTERNAL_ERROR } = require('../../constants/errorMessage');
const User = require('../../models/User');
const Vote = require('../../models/Vote');
const transformTimeFormat = require('../../util/transformTimeFormat');

exports.showCreateVote = async (req, res, next) => {
  res.render('createVote', { error: null });
};

exports.showSuccessPage = (req, res, next) => {
  res.render('success');
};

exports.createVote = async (req, res, next) => {
  try {
    const presentTime = transformTimeFormat(new Date());
    const loggedInUserEmail = req.session.passport.user;
    const userData = await User.findOne({ email: loggedInUserEmail });
    const items = req.body.voteItems;
    const objectedItems = [];

    if (presentTime > req.body.expireTime) {
      req.flash('error', '현재 시간보다 이전의 날짜는 선택할 수 없습니다.');
      res.status(400);

      return res.render('createVote', { error: req.flash('error') });
    }

    if (typeof(req.body.voteItems) !== 'object') {
      req.flash('error', '투표 항목은 최소 두 가지 이상이어야 합니다.');
      res.status(400);

      return res.render('createVote', { error: req.flash('error') });
    }

    for (let i = 0; i < items.length; i++) {
      const objectedItem = {};
      objectedItem.item = items[i];
      objectedItems.push(objectedItem);
    }

    req.body.voteCreator = userData._id;
    req.body.voteItems = objectedItems;
    req.body.expireTime = transformTimeFormat(req.body.expireTime);
    const newVote = Vote(req.body);
    await newVote.save();
    req.flash('voteCreated', '투표가 정상적으로 생성되었습니다.');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.showVotePage = async (req, res, next) => {
  if (!req.user) {
    req.session.callbackUrl = req.originalUrl;

    return res.render('callbackLogin', { callbackUrl: req.originalUrl, error: null });
  }

  const id = req.params.vote_id;
  const loggedInUserEmail = req.user.email;
  const votedList = req.user.voted;

  try {
    const voteData = await Vote.findById(id).populate('voteCreator');
    const voteItems = voteData.voteItems;
    const presentTime = transformTimeFormat(new Date());
    const isVoteOpened = presentTime < voteData.expireTime;
    const hasVoted = votedList.includes(id) ? true : false;

    if (!isVoteOpened) {
      voteItems.sort((prev, next) => {
        return next.voted - prev.voted;
      });
    }

    res.render('votePage',{
      voteData,
      isVoteOpened,
      loggedUserEmail: req.user.email,
      voteId: id,
      loggedInUserEmail,
      hasVoted,
      voteItems,
    });
  } catch (error) {
    next(createError(500, INTERNAL_ERROR));
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    const id = req.params.vote_id;
    await Vote.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    next(createError(500, INTERNAL_ERROR));
  }
};

exports.submitVote = async (req, res, next) => {
  const voteId = req.params.vote_id;
  const optionName = req.body.voteItem;

  try {
    const voteData = await Vote.findById(voteId);

    for (let i = 0; i < voteData.voteItems.length; i++) {
      if (voteData.voteItems[i].item === optionName) {
        voteData.voteItems[i].voted++;
        break;
      }
    }

    await User.findOneAndUpdate({ _id: req.user._id }, { $push: { voted: voteId } });
    await Vote.findByIdAndUpdate(voteId, voteData);
    req.flash('voteSuccess', '투표해주셔서 감사합니다.');
    res.redirect('/');
  } catch (error) {
    next(createError(500, INTERNAL_ERROR));
  }
};
