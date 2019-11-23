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
  inGame: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  gameId: {
    type: UUID,
    allowNull: false
  },
  userId: {
    type: UUID,
    allowNull: false
  }
});

module.exports = Player;
