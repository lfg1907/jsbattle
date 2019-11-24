const connection = require('../connection');

const { Sequelize } = connection;
const { BOOLEAN, UUID, UUIDV4 } = Sequelize;

const GameQuestion = connection.define('gameQuestion', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  completed: {
    type: BOOLEAN,
    defaultValue: false
  },
  gameId: {
    type: UUID,
    allowNull: false
  },
  questionId: {
    type: UUID,
    allowNull: false
  }
});

module.exports = GameQuestion;
