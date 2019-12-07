const connection = require('../connection');

const { Sequelize } = connection;
const { UUID, UUIDV4, STRING, INTEGER } = Sequelize;

const User = connection.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName: {
    type: STRING,
    allowNull: true
  },
  lastName: {
    type: STRING,
    allowNull: true
  },
  username: {
    type: STRING,
    allowNull: true
  },
  githubId: {
    type: INTEGER,
    allowNull: true
  }
});

module.exports = User;
