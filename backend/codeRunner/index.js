const { VM } = require('vm2');

const { parseCodeStr, parseArgs } = require('./parsers');

const runCode = (code, ...args) => {
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

  const parsedArgs = parseArgs(args);
  const parsedCode = parseCodeStr(code);

  // run code with arguments
  const funcResult = vm.run(
    `${code}
    ${parsedCode.name}(${parsedArgs})`
  );

  return {
    result: funcResult,
    consoles: consoles.map(c => c.join(' '))
  };
};

module.exports = runCode;
