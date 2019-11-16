const { VM } = require('vm2');

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

const funcOutput = vm.run(
  `(function(beep) { console.log('hello', "world", beep); return 1 + 2 })("bloop")

  function helloPerson(name) {
    console.log('hello ' + name)
    return name
  }

  helloPerson("Bob")
  `
);

// console.log(funcOutput);
// consoles.forEach(msgGroup => {
//   console.log(msgGroup.join(' '));
// });

const output = {
  result: funcOutput,
  consoles
};

console.log(output);
