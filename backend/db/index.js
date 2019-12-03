const connection = require('./connection');
const seed = require('./seed');

const {
  Game,
  GameQuestion,
  Question,
  TestCase,
  Player,
  User
} = require('./models');

User.hasMany(Player);
Player.belongsTo(User);

Game.hasMany(Player);
Player.belongsTo(Game);

Question.hasMany(GameQuestion);
GameQuestion.belongsTo(Question);

Game.hasMany(GameQuestion);
GameQuestion.belongsTo(Game);

Question.hasMany(TestCase);
TestCase.belongsTo(Question, { foreignKey: 'questionId' });

const sync = async (force = false) => {
  await connection.sync({ force });
  seed();
};

module.exports = {
  sync,
  models: {
    Game,
    GameQuestion,
    Question,
    TestCase,
    Player,
    User
  }
};
