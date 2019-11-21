const connection = require('./connection');
const seed = require('./seed');

const Question = require('./models/Question');
const TestCase = require('./models/TestCase');

Question.hasMany(TestCase, { foreignKey: 'testCaseId' });
TestCase.belongsTo(Question, { foreignKey: 'questionId' });

const sync = async (force = false) => {
  await connection.sync({ force });
  seed();
};

module.exports = {
  sync,
  models: {
    Question,
    TestCase
  }
};
