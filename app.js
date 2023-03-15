const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const thoughtsRouter = require('./routes/thoughts');
const reactionsRouter = require('./routes/reactions');
const friendsRouter = require('./routes/friends');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to my social network API!');
});

mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Use the usersRouter in the /api namespace
app.use('/api/users', usersRouter);
app.use('/api/thoughts', thoughtsRouter);
app.use('/api/reactions', reactionsRouter);
app.use('/api/users/:userId/friends', friendsRouter);

db.once('open', () => {
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });
});
