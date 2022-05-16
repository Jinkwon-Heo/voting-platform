const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  voteCreator: { type: String, required: true },
  voteName: { type: String, required: true },
  expireDate: { type: Date, required: true },
  voteResult: { type: Number, default: 0 },
  id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("User", UserSchema);
