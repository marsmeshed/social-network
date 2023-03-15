const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
  thoughtId: String,
  content: String,
  author: String,
});

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = Reaction;