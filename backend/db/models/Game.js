const connection = require('../connection');
const Player = require('./Player');

const { Sequelize } = connection;
const {
  BOOLEAN,
  INTEGER,
  STRING,
  UUID,
  UUIDV4
} = Sequelize;

const MAX_PLAYERS = 3;

const Game = connection.define('game', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  numOfPlayers: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      max: MAX_PLAYERS
    }
  },
  inProgress: {
    type: BOOLEAN,
    defaultValue: true
  }
});

Game.prototype.findWinningPlayer = function() {
  if (this.inProgress)
    throw new Error('Game is still in progress');

  return Player.findAll({
    where: { gameId: this.id }
  }).then(players => {
    return players.reduce((winner, player) => {
      if (!winner.score || player.score > winner.score)
        return player;
      return winner;
    }, {});
  });
};

module.exports = Game;
