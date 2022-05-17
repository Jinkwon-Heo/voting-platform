const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  voted: {
    type: Number,
    default: 0,
  },
});

const VoteSchema = new mongoose.Schema({
  voteCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  voteName: {
    type: String,
    required: true,
  },
  voteItems: [optionSchema],
  expireTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Vote', VoteSchema);
