const { VM } = require('vm2');

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

module.exports = runCode;
