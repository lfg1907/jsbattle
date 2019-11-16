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

  const func = vm.run(
    `${code}
    ${parsedCode.name}(${parsedArgs})`
  );
  console.log(func);

  return {
    results: func,
    consoles
  };
};

module.exports = runCode;
