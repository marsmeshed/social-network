const express = require('express');
const router = express.Router();

const Reaction = require('../models/reaction');

router.post('/', async (req, res) => {
  const { thoughtId, content, author } = req.body;
  const reaction = new Reaction({ thoughtId, content, author });
  await reaction.save();
  res.json(reaction);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Reaction.findByIdAndDelete(id);
  res.sendStatus(204);
});

module.exports = router;