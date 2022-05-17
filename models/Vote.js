const mongoose = require('mongoose');
const User = require('./User');

const VoteSchema = new mongoose.Schema({
  voteCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  voteName: { type: String, required: true },
  voteItems: [{ item: { type: String }, voted: { type: Number, default: 0 }}],
  expireTime: { type: String, required: true },
});

module.exports = mongoose.model('Vote', VoteSchema);
