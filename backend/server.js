require('dotenv').config();

const socketio = require('socket.io');

const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 8000;

db.sync(true)
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`\nApplication running on port ${PORT}\n`)
    );

    const io = socketio(server);

    // Default connection
    io.on('connection', socket => {
      console.log(`connected: ${socket.id}`);

      socket.on('game created', gameData => {
        console.log(`game created by ${socket.id}`);
        socket.broadcast.emit('game created', gameData);
      });

      socket.on('join game', gameData => {
        const { game } = gameData;
        console.log(`${socket.id} joined ${game.id}`);
        socket.broadcast.emit('game joined', gameData);
      });
    });

    // Game connection
    const readyCount = {};
    const submittedCount = {};
    io.of('/game').on('connection', socket => {
      socket.on('join room', ({ game }) => {
        console.log(`connected to room ${game.id}`);
        socket.join(game.id);
        socket.broadcast
          .in(game.id)
          .emit('room joined', { game });
      });

      socket.on('player ready', gameData => {
        const { game } = gameData;

        if (!readyCount[game.id]) {
          readyCount[game.id] = 1;
        } else {
          readyCount[game.id] += 1;
        }

        if (readyCount[game.id] === game.numOfPlayers) {
          io.of('/game')
            .in(game.id)
            .emit('game ready');
        }
      });

      socket.on('player submitted', gameQData => {
        const { gameQuestion, game } = gameQData;

        if (!submittedCount[gameQuestion.id]) {
          submittedCount[gameQuestion.id] = 1;
        } else {
          submittedCount[gameQuestion.id] += 1;
        }

        if (
          submittedCount[gameQuestion.id] ===
          game.numOfPlayers
        ) {
          io.of('/game')
            .in(game.id)
            .emit('all submitted');
        }
      });
    });
  })
  .catch(e =>
    console.error(
      `Failed to load app on port ${PORT} with error: ${e}`
    )
  );
