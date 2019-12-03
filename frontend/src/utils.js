const titleCase = phrase => {
  return phrase
    .split(' ')
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
};

const sortByCreated = games => {
  return [...games].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export { titleCase, sortByCreated };
