const express = require('express');

const { Question, TestCase } = require('../db/models');
const { runTestCases } = require('../codeRunner');
// const { checkAnswer } = require('../codeRunner/utils');

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
  Question.findRandom()
    .then(question => res.send(question))
    .catch(next);
});

// GET, POST
// /api/questions/:id
router
  .route('/:id')
  .get((req, res, next) => {
    Question.findByPk(req.params.id)
      .then(question => res.send(question))
      .catch(next);
  })
  .post(async (req, res, next) => {
    /* TODO
     * Add score to player if all test cases ran OK
     * playerId should be sent as part of req.body
     *
     * There's a lot of logic here... consider moving
     * it out of the route.
     */
    try {
      // need to destructure `playerId` too
      const { code } = req.body;
      const question = await Question.findByPk(
        req.params.id
      );
      const { functionName } = question;
      const testCases = await TestCase.findAll({
        where: { questionId: question.id }
      });

      // const outputsToSend = testCases.map(testCase => {
      //   const { result, consoles } = runCode(
      //     code,
      //     functionName,
      //     testCase.arguments
      //   );

      //   if (!checkAnswer(result, testCase.answer)) {
      //     return {
      //       wrong: `Expected ${testCase.answer} but got ${result}`,
      //       consoles
      //     };
      //   }
      //   return { result, consoles };
      // });

      const outputsToSend = runTestCases(
        code,
        functionName,
        testCases
      );

      res.send(outputsToSend);
    } catch (ex) {
      next(ex);
    }
  });

router.get('/:id/testcases', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id);
    const testCases = await TestCase.findAll({
      where: {
        questionId: question.id
      }
    });
    res.send(testCases);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:id/runtests', async (req, res, next) => {
  try {
    const { code } = req.body;
    const question = await Question.findByPk(req.params.id);
    const { functionName } = question;
    const testCases = await TestCase.findAll({
      where: { questionId: question.id }
    });

    const outputsToSend = runTestCases(
      code,
      functionName,
      testCases
    );

    res.send(outputsToSend);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
