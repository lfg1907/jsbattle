const connection = require('../connection');

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
      async afterUpdate(gameQuestion) {
        await gameQuestion.updateGame();
      }
    }
  }
);

// eslint-disable-next-line func-names
GameQuestion.prototype.updateGame = async function() {
  const incompleteGameQuestions = await GameQuestion.findAll(
    {
      where: { gameId: this.gameId, completed: false }
    }
  );

  const Game = connection.models.game;
  const game = await Game.findByPk(this.gameId);

  if (!incompleteGameQuestions.length) {
    await game.update({ inProgress: false });
  }
};

module.exports = GameQuestion;
