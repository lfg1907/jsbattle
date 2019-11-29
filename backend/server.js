require('dotenv').config();

const socketio = require('socket.io');

const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 8000;

let io;
let createGameSocket;
db.sync(true)
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`\nApplication running on port ${PORT}\n`)
    );

    io = socketio(server);
    io.sockets.on('connection', socket => {
      console.log(`connected: ${socket.id}`);

      socket.on('game created', gameData => {
        console.log(`game created by ${socket.id}`);
        socket.broadcast.emit('game created', gameData);
      });
    });
  })
  .catch(e =>
    console.error(
      `Failed to load app on port ${PORT} with error: ${e}`
    )
  );

module.exports = { createGameSocket };
