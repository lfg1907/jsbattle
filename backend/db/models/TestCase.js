const connection = require('../connection')
const { Sequelize } = connection;
const {UUID, UUIDV4, TEXT, STRING} = Sequelize

module.exports = connection.define('testcase', {
  id:{
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  arguments:{
    type:STRING
  },
  answer: {
    type: STRING
  }
})