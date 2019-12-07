import React, { useState, useEffect } from 'react';

const GameToJoinItem = ({ game, handleSelect }) => {
  const [displayStatus, setDisplayStatus] = useState('');
  useEffect(() => {
    if (game.status === 'IN_PROGRESS') {
      setDisplayStatus('In Progress');
    } else if (game.status === 'COMPLETED') {
      setDisplayStatus('Completed');
    } else if (game.numOfPlayers >= game.capacity) {
      setDisplayStatus('Full');
    } else {
      setDisplayStatus(
        `${game.numOfPlayers}/${game.capacity}`
      );
    }
  }, [game]);

  return (
    // eslint-disable-next-line
    <div
      className={
        game.status === 'STARTING' && game.numOfPlayers < 3
          ? 'game'
          : 'game inactive-game'
      }
      key={game.id}
      role="radio"
      aria-checked="false"
      onClick={ev => handleSelect(ev, game.id)}
    >
      {`${game.name} (${displayStatus})`}
    </div>
  );
};

export default GameToJoinItem;
