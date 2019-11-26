const titleCase = phrase => {
  return phrase
    .split(' ')
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
};

export { titleCase };
