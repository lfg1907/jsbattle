const express = require('express');

const { User } = require('../db/models');

const router = express.Router();
router.use(express.json());

// GET, POST
// /api/users
router
  .route('/')
  .get((req, res, next) => {
    User.findAll()
      .then(users => res.send(users))
      .catch(next);
  })
  .post((req, res, next) => {
    const { userData } = req.body;
    User.create(userData)
      .then(user => res.status(201).send(user))
      .catch(next);
  });

// GET, PUT, DELETE
// /api/users/:id
router
  .route('/:id')
  .get((req, res, next) => {
    User.findByPk(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })
  .put((req, res, next) => {
    User.findByPk(req.params.id)
      .then(user => user.update(req.body))
      .then(user => res.send(user))
      .catch(next);
  })
  .delete((req, res, next) => {
    User.findByPk(req.params.id)
      .then(user => user.destroy())
      .then(() => res.sendStatus(204))
      .catch(next);
  });

module.exports = router;
