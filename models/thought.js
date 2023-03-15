const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;