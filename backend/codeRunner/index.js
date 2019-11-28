const { VM } = require('vm2');
const { checkAnswer } = require('./utils');

const runCode = (code, funcName, testArgs) => {
  const consoles = [];
  const vm = new VM({
    sandbox: {
      console: {
        log(...messages) {
          consoles.push([...messages]);
        }
      }
    }
  });

  const funcResult = vm.run(
    `${code}
    ${funcName}(${testArgs})`
  );

  return {
    result: funcResult,
    consoles: consoles.map(c => c.join(' '))
  };
};

const runTestCases = (code, funcName, testCases) => {
  return testCases.map(testCase => {
    const output = runCode(
      code,
      funcName,
      testCase.arguments
    );
    const { result } = output;

    if (!checkAnswer(result, testCase.answer)) {
      output.wrong = `Expected ${testCase.answer} but got ${result}`;
    }
    return output;
  });
};

module.exports = {
  runCode,
  runTestCases
};
