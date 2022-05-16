const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, trim: true, required: true, lowercase: true, immutable: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  votes: [String],
  id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("User", UserSchema);
