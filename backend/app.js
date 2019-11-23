const express = require('express');
const path = require('path');

const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const playersRouter = require('./routes/players');

const app = express();

app.use(express.json());
app.use(
  '/assets',
  express.static(path.join(__dirname, '../frontend/assets'))
);

app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../frontend/index.html')
  );
});

// ROUTES
app.use('/api/questions', questionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/players', playersRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let message = "Something's not right";
  if (err.errors) {
    message = err.errors[0].message;
  } else if (err.message) {
    message = err.message;
  }

  if (err) {
    res.status(err.status || 500).send({ message });
  }
});

module.exports = app;
