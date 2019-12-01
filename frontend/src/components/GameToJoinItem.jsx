import React, { useState, useEffect } from 'react';

import socket from '../socket';

const GameToJoinItem = ({ game, handleSelect }) => {
  const [currentGame, setCurrentGame] = useState(game);
  socket.on('game joined', gameData => {
    if (gameData.game.id === currentGame.id) {
      setCurrentGame(gameData.game);
    }
  });

  const [status, setStatus] = useState('');
  useEffect(() => {
    if (currentGame.status === 'IN_PROGRESS') {
      setStatus('In Progress');
    } else if (currentGame.status === 'COMPLETED') {
      setStatus('Completed');
    } else if (currentGame.numOfPlayers >= 3) {
      setStatus('Full');
    } else {
      setStatus(`${currentGame.numOfPlayers}/3`);
    }
  }, [currentGame]);

  return (
    // eslint-disable-next-line
    <div
      className={
        status === 'In Progress' ||
        status === 'Completed' ||
        status === 'Full'
          ? 'game inactive-game'
          : 'game'
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
