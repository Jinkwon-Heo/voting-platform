const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, unique: true, trim: true, required: true, lowercase: true, immutable: true },
  username: { type: String, required: true },
  password: { type: String },
  // votes: { type: mongoose.Schema.Types.ObjectId, ref: 'Vote', required: true },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
