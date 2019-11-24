const connection = require('../connection');

const { Sequelize } = connection;
const {
  BOOLEAN,
  INTEGER,
  STRING,
  UUID,
  UUIDV4
} = Sequelize;

const MAX_PLAYERS = 3;
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
    numOfPlayers: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        max: MAX_PLAYERS
      }
    },
    inProgress: {
      type: BOOLEAN,
      defaultValue: true
    }
  },
  {
    hooks: {
      async afterCreate(game) {
        await game.addQuestions(NUM_QUESTIONS);
      }
    }
  }
);

Game.prototype.findWinningPlayer = function() {
  if (this.inProgress)
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

Game.prototype.addQuestions = async function(num) {
  const Question = connection.models.question;
  const GameQuestion = connection.models.gameQuestion;

  const questions = await Question.createSet(num);
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
