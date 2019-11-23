const express = require('express');

const { Question, TestCase } = require('../db/models');
const runCode = require('../codeRunner');
const { checkAnswer } = require('../codeRunner/utils');

const router = express.Router();
router.use(express.json());

// GET /api/questions
router.get('/', (req, res, next) => {
  Question.findAll()
    .then(questions => res.send(questions))
    .catch(next);
});

// GET /api/questions/random
router.get('/random', (req, res, next) => {
  // findRandom() is not implemented yet
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
  .post(async (req, res, next) => {
    try {
      const { code } = req.body;
      const question = await Question.findByPk(
        req.params.id
      );
      const { functionName } = question;
      const testCases = await TestCase.findAll({
        where: { questionId: question.id }
      });

      const outputsToSend = testCases.map(testCase => {
        const { result, consoles } = runCode(
          code,
          functionName,
          testCase.arguments
        );

        if (!checkAnswer(result, testCase.answer)) {
          return {
            wrong: `Expected ${testCase.answer} but got ${result}`,
            consoles
          };
        }
        return { result, consoles };
      });

      res.send(outputsToSend);
    } catch (ex) {
      next(ex);
    }
  });

module.exports = router;
