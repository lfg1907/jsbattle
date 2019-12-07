const connection = require('../connection');

const { Sequelize } = connection;
const { ENUM, INTEGER, STRING, UUID, UUIDV4 } = Sequelize;

const DEFAULT_MAX = 3;
const NUM_QUESTIONS = 5;

const Game = connection.define(
  'game',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    capacity: {
      type: INTEGER,
      defaultValue: DEFAULT_MAX,
      allowNull: false
    },
    difficulty: {
      type: ENUM,
      values: ['EASY', 'MEDIUM', 'HARD'],
      defaultValue: 'EASY',
      allowNull: false
    },
    numOfPlayers: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notAboveMax(value) {
          if (value > this.capacity) {
            throw new Error(
              'Number of players cannot exceed capacity'
            );
          }
        }
      }
    },
    status: {
      type: ENUM,
      values: ['STARTING', 'IN_PROGRESS', 'COMPLETED'],
      defaultValue: 'STARTING'
    }
  },
  {
    hooks: {
      async afterCreate(game) {
        await game.addQuestions(
          NUM_QUESTIONS,
          game.difficulty
        );
      }
    }
  }
);

// eslint-disable-next-line func-names
Game.prototype.findWinningPlayer = function() {
  if (this.status === 'IN_PROGRESS')
    throw new Error('Game is still in progress');

  const Player = connection.models.player;

  return Player.findAll({
    where: { gameId: this.id }
  }).then(players => {
    return players.reduce((winner, player) => {
      if (!winner.score || player.score > winner.score)
        return player;
      return winner;
    }, {});
  });
};

// eslint-disable-next-line func-names
Game.prototype.addQuestions = async function(
  num,
  difficulty
) {
  const Question = connection.models.question;
  const GameQuestion = connection.models.gameQuestion;

  const questions = await Question.createSet(
    num,
    difficulty
  );
  return Promise.all(
    questions.map(question =>
      GameQuestion.create({
        gameId: this.id,
        questionId: question.id
      })
    )
  );
};

module.exports = Game;
