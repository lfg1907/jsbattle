import React, { useState, useEffect } from 'react';

const GameToJoinItem = ({ game, handleSelect }) => {
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (game.status === 'IN_PROGRESS') {
      setStatus('In progress');
    } else if (game.status === 'COMPLETED') {
      setStatus('Completed');
    } else if (game.numOfPlayers >= 3) {
      setStatus('Full');
    }
  }, []);

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
      {`${game.name} ${status ? `(${status})` : ''}`}
    </div>
  );
};

export default GameToJoinItem;
