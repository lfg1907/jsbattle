const connection = require('../connection');
const { getRandomNumber, getUniques } = require('../utils');

const { Sequelize } = connection;
const { UUID, UUIDV4, TEXT, STRING } = Sequelize;

const Question = connection.define('question', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  prompt: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  examples: {
    type: TEXT,
    allowNull: false
  },
  functionName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  params: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

Question.findRandom = async function() {
  const questions = await this.findAll();
  const randomIdx = getRandomNumber(0, questions.length);
  return questions[randomIdx];
};

// Create a set of random questions
Question.createSet = async function(numOfQuestions) {
  const questions = await this.findAll();
  const indices = getUniques(
    0,
    questions.length,
    numOfQuestions
  );

  return indices.map(idx => questions[idx]);
};

module.exports = Question;
