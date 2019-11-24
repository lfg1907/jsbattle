const connection = require('../connection');
const Game = require('./Game');

const { Sequelize } = connection;
const { BOOLEAN, UUID, UUIDV4 } = Sequelize;

const GameQuestion = connection.define(
  'gameQuestion',
  {
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
  },
  {
    hooks: {
      afterUpdate(gameQuestion) {
        GameQuestion.updateGame(gameQuestion.gameId);
      }
    }
  }
);

GameQuestion.updateGame = async function(gameId) {
  const incompleteGameQuestions = this.findAll({
    where: { gameId, completed: false }
  });
  const game = await Game.findByPk(gameId);

  if (!incompleteGameQuestions.length) {
    await game.update({ inProgress: false });
  }
};

module.exports = GameQuestion;
