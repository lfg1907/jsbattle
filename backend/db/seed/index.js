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
  { model: TestCase, file: 'q1TestCases.json' },
  { model: TestCase, file: 'q2TestCases.json' },
  { model: User, file: 'users.json' },
  { model: Player, file: 'user1Players.json' },
  { model: Player, file: 'user2Players.json' },
  { model: Player, file: 'user3Players.json' }
];

const createModelData = (data, Model, options = {}) => {
  return Promise.all(
    data.map(el => {
      return Model.create({ ...el, ...options });
    })
  );
};

const getSeedFileData = file => {
  const jsonData = fs.readFileSync(
    path.join(SEED_FOLDER, file)
  );
  return JSON.parse(jsonData);
};

const seed = async () => {
  // Create empty games
  const [game1, game2] = await Promise.all([
    Game.create(),
    Game.create()
  ]);

  let q1;
  let q2;
  let user1;
  let user2;
  let user3;
  let p1game1;
  let p1game2;
  let p2game1;
  let p2game2;
  let p3game1;
  let p3game2;

  /* eslint-disable no-plusplus, no-await-in-loop */
  for (let i = 0; i < SEED_FILES.length; i++) {
    const { model, file } = SEED_FILES[i];
    const seedData = getSeedFileData(file);

    switch (file.split('.')[0]) {
      case 'questions':
        [q1, q2] = await createModelData(seedData, model);
        break;
      case 'q1TestCases':
        await createModelData(seedData, model, {
          questionId: q1.id
        });
        break;
      case 'q2TestCases':
        await createModelData(seedData, model, {
          questionId: q2.id
        });
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
        [p3game1, p3game2] = await createModelData(
          seedData,
          model,
          {
            userId: user3.id
          }
        );
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
    p2game2.joinGame(game2),
    p3game2.joinGame(game2)
  ]);

  await game2.update({ completed: true });
};

module.exports = seed;
