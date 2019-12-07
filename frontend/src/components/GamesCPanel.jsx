import React from 'react';

import CreateGame from './CreateGame';
import JoinGame from './JoinGame';


const GamesCPanel = () => {
  return (
    <div id="games-control-panel-container">
      <div id="games-control-panel">
        <CreateGame />
        <JoinGame />
      </div>
    </div>
  );
};

export default GamesCPanel;
