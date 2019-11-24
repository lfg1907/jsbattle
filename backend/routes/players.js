const express = require('express');

const { Player } = require('../db/models');

const router = express.Router();
router.use(express.json());

// GET, POST
// /api/players
router
  .route('/')
  .get((req, res, next) => {
    Player.findAll()
      .then(players => res.send(players))
      .catch(next);
  })
  .post((req, res, next) => {
    const { userId } = req.body;
    Player.create({ userId })
      .then(player => res.status(201).send(player))
      .catch(next);
  });

// GET, DELETE
// /api/players/:id
router
  .route('/:id')
  .get((req, res, next) => {
    Player.findByPk(req.params.id)
      .then(player => res.send(player))
      .catch(next);
  })
  .delete((req, res, next) => {
    Player.findByPk(req.params.id)
      .then(player => player.destroy())
      .then(() => res.sendStatus(204))
      .catch(next);
  });

module.exports = router;
