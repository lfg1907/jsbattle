const connection = require('../connection');

const { Sequelize } = connection;
const { UUID, UUIDV4, STRING } = Sequelize;

module.exports = connection.define('testcase', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  arguments: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  answer: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  questionId: {
    type: UUID,
    allowNull: false
  }
});
