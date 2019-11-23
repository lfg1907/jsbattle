const express = require('express');
const path = require('path');

const runCode = require('./codeRunner');
const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');

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

// temporary route for testing
app.post('/api/submit', (req, res, next) => {
  try {
    const { code } = req.body;

    // 'Bob' is a temp parameter for code
    const output = runCode(code, 'Bob');
    res.send(output);
  } catch (err) {
    next({
      status: 500,
      message: "Something's wrong with your code..."
    });
  }
});

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
