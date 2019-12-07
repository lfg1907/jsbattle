import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../socket';
import { actions } from '../store';

import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

const GamesCPanel = ({
  loadGames,
  updateGame,
  addGameByOthers
}) => {
  useEffect(() => {
    loadGames();
    socket.on('game created', gameData => {
      const { game } = gameData;
      addGameByOthers(game);
    });

    socket.on('game joined', gameData => {
      updateGame(gameData.game);
    });
  }, []);

  return (
    <div id="games-control-panel-container">
      <div id="games-control-panel">
        <CreateGame />
        <JoinGame />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addGameByOthers(game) {
    dispatch(actions.addGame(game));
  },
  loadGames() {
    dispatch(actions.getUser());
    dispatch(actions.getGames());
  },
  updateGame(updatedGame) {
    dispatch(actions.updateGame(updatedGame));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(GamesCPanel);
