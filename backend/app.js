const express = require('express')
const app = express()
const path = require('path')

app.use(express.json());
app.use('/', express.static('dist'));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../frontend/index.html')));

app.use(({ message }, req, res, next) => {
  res.status(500).send({ message });
});

module.exports = app;