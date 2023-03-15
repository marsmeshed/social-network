const express = require('express');
const router = express.Router();

const Thought = require('../models/thought');

router.get('/', async (req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  const thought = new Thought({ title, content, author });
  await thought.save();
  res.json(thought);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const thought = await Thought.findByIdAndUpdate(id, { title, content });
  res.json(thought);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Thought.findByIdAndDelete(id);
  res.sendStatus(204);
});

module.exports = router;