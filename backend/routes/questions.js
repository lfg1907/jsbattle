const express = require('express');

// Models don't exist yet
const { Question, TestCase } = require('../data/models');
const runCode = require('../codeRunner');

const router = express.Router();
router.use(express.json());

// GET /api/questions/random
router.get('/random', (req, res, next) => {
  Question.findRandom()
    .then(question => res.send(question))
    .catch(next);
});

// /api/questions/:id
router
  .route('/:id')
  .get((req, res, next) => {
    Question.findByPk(req.params.id)
      .then(question => res.send(question))
      .catch(next);
  })
  .post('/:id', async (req, res, next) => {
    try {
      const { code } = req.body;
      const question = await Question.findByPk(
        req.params.id
      );
      const { funcName } = question;
      const testCases = await TestCase.findAll({
        where: { questionId: question.id }
      });

      testCases.forEach(testCase => {
        const params = testCase.params.split(', ');
        const { result } = runCode(code, funcName, params);
        if (result !== testCase.answer) {
          throw new Error(
            `Expected ${testCase.answer} but got ${result}`
          );
        }
      });
    } catch (ex) {
      next(ex);
    }
  });
