const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/:userId/friends', async (req, res) => {
  const { userId } = req.params;
  const { friendId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'User is already friends with this person' });
    }
    user.friends.push(friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'User is not friends with this person' });
    }
    user.friends = user.friends.filter((friend) => friend !== friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;