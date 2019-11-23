const connection = require('./connection');
const seed = require('./seed');

const {
  Game,
  Question,
  TestCase,
  Player,
  User
} = require('./models');

User.hasMany(Player);
Player.belongsTo(User);

Game.hasMany(Player);
Player.belongsTo(Game);

// Game.hasMany(Question);
// Question.belongsTo(Game);

Question.hasMany(TestCase, { foreignKey: 'testcaseId' });
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
