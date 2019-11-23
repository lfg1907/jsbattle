const connection = require('../connection');
const Player = require('./Player');

const { Sequelize } = connection;
const { BOOLEAN, INTEGER, UUID, UUIDV4 } = Sequelize;

const MAX_PLAYERS = 3;

const Game = connection.define('game', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  numOfPlayers: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      max: MAX_PLAYERS
    }
  },
  completed: {
    type: BOOLEAN,
    defaultValue: false
  }
});

Game.prototype.findWinningPlayer = function() {
  if (!this.completed) return {};

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
