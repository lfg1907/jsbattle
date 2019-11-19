const connection = require('../connection')
const Question = require('./models/Question')
const TestCase = require('./models/TestCase')

Question.hasMany(TestCase)
TestCase.belongsTo(Question, { foreignKey: 'questionId'})

const sync = async (force = false) => {
  await connection.sync({ force });
};

module.exports = {
  sync,
  models: {
    Question,
    TestCase
  }
}
