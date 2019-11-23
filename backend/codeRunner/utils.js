// Check if 2 arrays are equal to each other recursively
// Only works with arrays of primitives (ie. no objects)
const checkArrs = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = [...arr1].sort((a, b) => a - b);
  const sortedArr2 = [...arr2].sort((a, b) => a - b);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sortedArr1.length; i++) {
    if (Array.isArray(sortedArr1[i])) {
      return checkArrs(sortedArr1[i], sortedArr2[i]);
    }
    // eslint-disable-next-line eqeqeq
    if (sortedArr1[i] != sortedArr2[i]) return false;
  }

  return true;
};

// Check result against answerKey, with differing types.
// result is the computed result, so will be in whatever type
// is output by function. answerKey will always be a string
const checkAnswer = (result, answerKey) => {
  if (Array.isArray(result)) {
    const answerKeyArr = JSON.parse(answerKey);
    return checkArrs(result, answerKeyArr);
  }
  if (
    typeof result === 'string' ||
    typeof result === 'number'
  ) {
    // eslint-disable-next-line eqeqeq
    return result == answerKey;
  }
  return false;
};

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

module.exports = { checkAnswer, parseCodeStr, parseArgs };
