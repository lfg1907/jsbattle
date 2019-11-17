const { VM } = require('vm2');

const { parseCodeStr, parseArgs } = require('./parsers');

// args should eventually be an array
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
  // Eventually the function name should be passed
  // in to runCode() so we don't have to parse it
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
