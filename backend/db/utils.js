const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getUniques = (min, max, amount) => {
  const container = new Set();

  while (container.size < amount) {
    let num = getRandomNumber(min, max);
    while (container.has(num)) {
      num += 1;
      if (num >= max) {
        num = 0;
      }
    }
    container.add(num);
  }
  return Array.from(container);
};

module.exports = { getRandomNumber, getUniques };
