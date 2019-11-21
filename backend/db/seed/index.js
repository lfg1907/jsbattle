require('dotenv').config();
const fs = require('fs');
const path = require('path');

const db = require('../index');

const { Question, TestCase } = db.models;

const SEED_FOLDER = path.resolve('./data');
const SEED_FILES = [
  { model: Question, file: 'questions.json' },
  { model: TestCase, file: 'testcases.json' }
];

const createModelData = (list, Model) => {
  return Promise.all(list.map(el => Model.create(el)));
};

const getSeedFileData = file => {
  const jsonData = fs.readFileSync(
    path.join(SEED_FOLDER, file)
  );
  return JSON.parse(jsonData);
};

const seed = async () => {
  SEED_FILES.forEach(async ({ model, file }) => {
    const seedData = getSeedFileData(file);
    console.log(`Loading data from ${file}...`);
    await createModelData(seedData, model);
  });
};

module.exports = seed;
