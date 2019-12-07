const connection = require('../connection');

const { Sequelize } = connection;
const { BOOLEAN, UUID, UUIDV4, DECIMAL } = Sequelize;

const Player = connection.define('player', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  score: {
    type: DECIMAL,
    defaultValue: 0.0,
    allowNull: false
  },
  isHost: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  gameId: {
    type: UUID,
    allowNull: true
  },
  userId: {
    type: UUID,
    allowNull: false
  }
});

Player.prototype.joinGame = async function(game) {
  if (game.status === 'COMPLETED')
    throw new Error('This game is finished');
  if (game.status === 'IN_PROGRESS')
    throw new Error('This game already in progress');
  if (game.numOfPlayers >= game.capacity)
    throw new Error('This game is full');

  try {
    await game.update({
      numOfPlayers: game.numOfPlayers + 1
    });
    await this.update({ gameId: game.id });
  } catch (ex) {
    console.log(ex);
  }
};

Player.prototype.hostGame = async function(game) {
  this.update({ isHost: true });
  this.joinGame(game);
};

module.exports = Player;
