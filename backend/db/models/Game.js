const connection = require('../connection');

const { Sequelize } = connection;
const { BOOLEAN, INTEGER, UUID, UUIDV4 } = Sequelize;

const Game = connection.define('game', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  numOfPlayers: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  completed: {
    type: BOOLEAN,
    defaultValue: false
  },
  winnerId: {
    type: UUID,
    allowNull: true
  }
});

module.exports = Game;
