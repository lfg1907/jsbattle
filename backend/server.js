require('dotenv').config();

const socketio = require('socket.io');

const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 8000;

let io;
const readyCount = {};
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

      socket.on('join game', gameData => {
        const { game } = gameData;
        console.log(`${socket.id} joined ${game.id}`);
        io.sockets.emit('game joined', { game });
      });

      socket.on('player ready', gameData => {
        const { game } = gameData;

        if (!readyCount[game.id]) {
          readyCount[game.id] = 1;
        } else {
          readyCount[game.id] += 1;
        }

        if (readyCount[game.id] === game.numOfPlayers) {
          io.sockets.emit('game ready', {
            gameId: game.id
          });
        }
      });
    });
  })
  .catch(e =>
    console.error(
      `Failed to load app on port ${PORT} with error: ${e}`
    )
  );
