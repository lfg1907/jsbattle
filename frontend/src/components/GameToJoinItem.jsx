import React, { useState, useEffect } from 'react';

import socket from '../socket';

const GameToJoinItem = ({ game, handleSelect }) => {
  const [currentGame, setCurrentGame] = useState(game);
  socket.on('game joined', gameData => {
    if (gameData.game.id === currentGame.id) {
      setCurrentGame(gameData.game);
    }
  });

  const [displayStatus, setDisplayStatus] = useState('');
  useEffect(() => {
    if (currentGame.status === 'IN_PROGRESS') {
      setDisplayStatus('In Progress');
    } else if (currentGame.status === 'COMPLETED') {
      setDisplayStatus('Completed');
    } else if (currentGame.numOfPlayers >= 3) {
      setDisplayStatus('Full');
    } else {
      setDisplayStatus(`${currentGame.numOfPlayers}/3`);
    }
  }, [currentGame]);

  return (
    // eslint-disable-next-line
    <div
      className={
        currentGame.status === 'STARTING' &&
        currentGame.numOfPlayers < 3
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
