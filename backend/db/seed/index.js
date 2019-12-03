require('dotenv').config();
const fs = require('fs');
const path = require('path');

const {
  User,
  Player,
  Game,
  Question,
  TestCase
} = require('../models');

const SEED_FOLDER = path.resolve(__dirname, './data');
const SEED_FILES = [
  { model: Question, file: 'questions.json' },
  { model: Game, file: 'games.json' },
  { model: User, file: 'users.json' },
  { model: Player, file: 'user1Players.json' },
  { model: Player, file: 'user2Players.json' },
  { model: Player, file: 'user3Players.json' }
];

const TEST_CASES_FOLDER = path.join(
  SEED_FOLDER,
  '/testCases'
);

const createModelData = (data, Model, options = {}) => {
  return Promise.all(
    data.map(el => {
      return Model.create({ ...el, ...options });
    })
  );
};

const getSeedFileData = (dir, file) => {
  const jsonData = fs.readFileSync(path.join(dir, file));
  return JSON.parse(jsonData);
};

const setupTestCases = (dir, cb) => {
  fs.readdir(dir, async (err, files) => {
    if (err) throw err;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await cb(files[i]);
    }
  });
};

const seed = async () => {
  let questions;
  let game1;
  let game2;
  let user1;
  let user2;
  let user3;
  let p1game1;
  let p1game2;
  let p2game1;
  let p2game2;
  let p3game1;

  /* eslint-disable no-plusplus, no-await-in-loop */
  for (let i = 0; i < SEED_FILES.length; i++) {
    const { model, file } = SEED_FILES[i];
    const seedData = getSeedFileData(SEED_FOLDER, file);

    switch (file.split('.')[0]) {
      case 'questions':
        questions = await createModelData(seedData, model);
        break;
      case 'games':
        [game1, game2] = await createModelData(
          seedData,
          model
        );
        break;
      case 'users':
        [user1, user2, user3] = await createModelData(
          seedData,
          model
        );
        break;
      case 'user1Players':
        [p1game1, p1game2] = await createModelData(
          seedData,
          model,
          {
            userId: user1.id
          }
        );
        break;
      case 'user2Players':
        [p2game1, p2game2] = await createModelData(
          seedData,
          model,
          {
            userId: user2.id
          }
        );
        break;
      case 'user3Players':
        [p3game1] = await createModelData(seedData, model, {
          userId: user3.id
        });
        break;
      default:
        return;
    }
  }

  await Promise.all([
    p1game1.joinGame(game1),
    p2game1.joinGame(game1),
    p3game1.joinGame(game1),
    p1game2.joinGame(game2),
    p2game2.joinGame(game2)
  ]);

  await game2.update({ status: IN_PROGRESS });

  setupTestCases(TEST_CASES_FOLDER, async file => {
    const seedData = getSeedFileData(
      TEST_CASES_FOLDER,
      file
    );
    const questionIdx =
      parseInt(file.split('.')[0].replace('q', ''), 10) - 1;

    await createModelData(seedData, TestCase, {
      questionId: questions[questionIdx].id
    });
  });
};

module.exports = seed;
