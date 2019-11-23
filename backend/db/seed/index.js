require('dotenv').config();
const fs = require('fs');
const path = require('path');

const { Question, TestCase } = require('../models');

const SEED_FOLDER = path.resolve(__dirname, './data');
const QUESTION_FILE = 'questions.json';

const getSeedFileData = file => {
  // should probably switch to readFile() at some point
  const jsonData = fs.readFileSync(
    path.join(SEED_FOLDER, file)
  );
  return JSON.parse(jsonData);
};

const seed = async () => {
  const seedData = getSeedFileData(QUESTION_FILE);

  const [q1, q2] = await Promise.all(
    seedData.map(el => {
      return Question.create(el);
    })
  );

  // Q1 testcases
  await TestCase.create({
    arguments: '[4, 5, 3, 1, 2]',
    answer: '5',
    questionId: q1.id
  });
  await TestCase.create({
    arguments: '[100, 99, 4, 2, 102]',
    answer: '102',
    questionId: q1.id
  });

  // Q2 testcases
  await TestCase.create({
    arguments: '[1, 5, 2, 9, 19, 36, 3], 100',
    answer: '-1',
    questionId: q2.id
  });
  await TestCase.create({
    arguments: '[1, 5, 2, 9, 19, 36, 3], 8',
    answer: '[3, 5]',
    questionId: q2.id
  });
};

module.exports = seed;
