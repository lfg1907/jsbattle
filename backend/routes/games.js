const express = require('express');

const {
  Game,
  GameQuestion,
  Player,
  Question
} = require('../db/models');

const router = express.Router();
router.use(express.json());

// GET, POST
// /api/games
router
  .route('/')
  .get((req, res, next) => {
    Game.findAll()
      .then(games => res.send(games))
      .catch(next);
  })
  .post(async (req, res, next) => {
    try {
      const { name, capacity, playerId } = req.body;
      const game = await Game.create({ name, capacity });

      if (playerId) {
        const player = await Player.findByPk(playerId);
        await player.hostGame(game);
      }
      res.status(201).send(game);
    } catch (err) {
      next(err);
    }
  });

// GET, DELETE
// /api/games/:id
router
  .route('/:id')
  .get((req, res, next) => {
    Game.findByPk(req.params.id)
      .then(game => res.send(game))
      .catch(next);
  })
  .delete((req, res, next) => {
    Game.findByPk(req.params.id)
      .then(game => game.destroy())
      .then(() => res.sendStatus(204))
      .catch(next);
  });

// GET /api/games/:id/questions
router.get('/:id/questions', (req, res, next) => {
  GameQuestion.findAll({
    where: { gameId: req.params.id },
    include: [{ model: Question }]
  })
    // .then(questions => hydrateGameQuestions(questions))
    .then(questions => res.send(questions))
    .catch(next);
});

// PUT /api/games/question/:id
router.put('/question/:id', (req, res, next) => {
  GameQuestion.findByPk(req.params.id)
    .then(question => {
      const { completed } = req.body;
      return question.update({ completed });
    })
    .then(question => res.send(question))
    .catch(next);
});

// PUT /api/games/:id/join
router.put('/:id/join', async (req, res, next) => {
  try {
    const { playerId } = req.body;
    const game = await Game.findByPk(req.params.id);
    const player = await Player.findByPk(playerId);
    await player.joinGame(game);
    res.send(game);
  } catch (err) {
    next(err);
  }
});

// GET /api/games/:id/winner
router.get('/:id/winner', (req, res, next) => {
  Game.findByPk(req.params.id)
    .then(game => {
      game
        .findWinningPlayer()
        .then(player => res.send(player));
    })
    .catch(next);
});

// GET /api/games/:id/players
router.get('/:id/players', (req, res, next) => {
  Player.findAll({ where: { gameId: req.params.id } })
    .then(players => res.send(players))
    .catch(next);
});

module.exports = router;
