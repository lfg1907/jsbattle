const express = require('express');

const { Game, Player } = require('../db/models');

const router = express.Router();
router.use(express.json());

// GET /api/games
router
  .route('/')
  .get((req, res, next) => {
    Game.findAll()
      .then(games => res.send(games))
      .catch(next);
  })
  .post((req, res, next) => {
    const { gameData } = req.body;
    Game.create(gameData)
      .then(game => res.status(201).send(game))
      .catch(next);
  });

// GET, PUT, DELETE
// /api/games/:id
router
  .route('/:id')
  .get((req, res, next) => {
    Game.findByPk(req.params.id)
      .then(game => res.send(game))
      .catch(next);
  })
  .put((req, res, next) => {
    Game.findByPk(req.params.id)
      .then(game => game.update(req.body))
      .catch(next);
  })
  .delete((req, res, next) => {
    Game.findByPk(req.params.id)
      .then(game => game.destroy)
      .then(() => res.sendStatus(204))
      .catch(next);
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

router.get('/:id/players', (req, res, next) => {
  Player.findAll({ where: { gameId: req.params.id } })
    .then(players => res.send(players))
    .catch(next);
});

module.exports = router;
