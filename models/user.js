const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  friends: [String],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;