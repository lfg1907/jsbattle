import React from 'react';

import CreateGame from './CreateGame';
import JoinGame from './JoinGame';
import Login from './Login'

const GamesCPanel = () => {
  return (
    <div id="games-control-panel-container">
      <div id="games-control-panel">
        <Login />
        <CreateGame />
        <JoinGame />
      </div>
    </div>
  );
};

export default GamesCPanel;
