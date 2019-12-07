const connection = require('../connection');
const { getRandomNumber, getUniques } = require('../utils');

const { Sequelize } = connection;
const { ENUM, UUID, UUIDV4, TEXT, STRING, Op } = Sequelize;

const Question = connection.define('question', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  difficulty: {
    type: ENUM,
    values: ['EASY', 'MEDIUM', 'HARD'],
    allowNull: false
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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

// eslint-disable-next-line func-names
Question.findRandom = async function() {
  const questions = await this.findAll();
  const randomIdx = getRandomNumber(0, questions.length);
  return questions[randomIdx];
};

// Create a set of random questions
// eslint-disable-next-line func-names
Question.createSet = async function(
  numOfQuestions,
  maxDifficulty
) {
  if (!maxDifficulty)
    throw new Error('Need to specify game difficulty');

  let questions;
  if (maxDifficulty === 'HARD') {
    questions = await this.findAll();
  } else if (maxDifficulty === 'MEDIUM') {
    questions = await this.findAll({
      where: { difficulty: { [Op.or]: ['MEDIUM', 'EASY'] } }
    });
  } else if (maxDifficulty === 'EASY') {
    questions = await this.findAll({
      where: { difficulty: 'EASY' }
    });
  }

  // Not enough questions in the database,
  // so just return all found questions
  if (questions.length < numOfQuestions) {
    return questions;
  }

  const indices = getUniques(
    0,
    questions.length,
    numOfQuestions
  );

  return indices.map(idx => questions[idx]);
};

module.exports = Question;
