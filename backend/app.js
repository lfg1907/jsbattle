const express = require('express');
const path = require('path');

const runCode = require('./codeRunner');

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

app.post('/api/submit', (req, res, next) => {
  try {
    const { code } = req.body;
    const output = runCode(code, 'Bob');
    console.log(output);
    res.send(output);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err);
});

module.exports = app;
