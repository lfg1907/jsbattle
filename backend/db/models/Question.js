const connection = require('../connection');

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

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Question.findRandom = async function() {
  const questions = await this.findAll();
  const randomIdx = getRandom(0, questions.length);
  return questions[randomIdx];
};

module.exports = Question;
