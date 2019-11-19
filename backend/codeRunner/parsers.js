// Parse code string and return name and params
const parseCodeStr = codeStr => {
  const firstLine = codeStr.split('\n')[0];

  const funcParams = firstLine
    .match(/\(.*\)/g)[0]
    .replace(/\(|\)/g, '')
    .split(',')
    .map(arg => arg.replace(' ', ''));

  let funcName = firstLine.split(' ')[1];
  if (funcName.includes('(')) {
    [funcName] = funcName.split('(');
  }
  if (funcName.includes('=')) {
    [funcName] = funcName.split('=');
  }

  return {
    name: funcName,
    params: funcParams
  };
};

// Parse arguments array, wrap strings in single quotes,
// and return as string, joined with ", "
const parseArgs = argsArray => {
  return argsArray
    .map(arg => {
      if (typeof arg === 'string') return `'${arg}'`;
      return arg;
    })
    .join(', ');
};

module.exports = { parseCodeStr, parseArgs };
