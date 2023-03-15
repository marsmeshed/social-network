const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(id, { name, email });
  res.json(user);
});

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   await User.findByIdAndDelete(id);
//   res.sendStatus(204);
// });

// router.post('/:userId/friends', async (req, res) => {
//   const { userId } = req.params;
//   const { friendId } = req.body;
//   const user = await User.findById(userId);
//   user.friends.push(friendId);
//   await user.save();
//   res.json(user);
// });

router.delete('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;
  const user = await User.findById(userId);
  user.friends = user.friends.filter((friend) => friend !== friendId);
  await user.save();
  res.json(user);
});

module.exports = router;