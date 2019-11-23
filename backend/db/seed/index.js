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
  { model: Game, file: 'games.json' },
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

const createPlayersData = (data, userId, ...gameIds) => {
  if (data.length !== gameIds.length) {
    throw new Error(
      "Number of Players and Games don't match"
    );
  }
  return Promise.all(
    data.map((player, i) => {
      return Player.create({
        ...player,
        userId,
        gameId: gameIds[i]
      });
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
  let q1;
  let q2;
  let game1;
  let game2;
  let user1;
  let user2;
  let user3;

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
        await createPlayersData(
          seedData,
          user1.id,
          game1.id,
          game2.id
        );
        break;
      case 'user2Players':
        await createPlayersData(
          seedData,
          user2.id,
          game1.id,
          game2.id
        );
        break;
      case 'user3Players':
        await createPlayersData(
          seedData,
          user3.id,
          game1.id,
          game2.id
        );
        break;
      default:
        return;
    }
  }
};

module.exports = seed;
