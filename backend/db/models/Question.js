const connection = require('../connection')
;
const { Sequelize } = connection;
const { UUID, UUIDV4, TEXT, STRING } = Sequelize;

module.exports = connection.define('question', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  text: {
    type: TEXT
  },
  functionName: {
    type: STRING
  }
});
