import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../socket';
import { actions } from '../store';

import GamesCPanel from './GamesCPanel';
import UserStats from './UserStats';

const Home = ({
  loadGames,
  updateGame,
  addGameByOthers
}) => {
  useEffect(() => {
    socket.on('game created', gameData => {
      const { game } = gameData;
      addGameByOthers(game);
    });
    socket.on('game joined', gameData => {
      updateGame(gameData.game);
    });

    loadGames();
  }, []);

  return (
    <div id="home">
      <UserStats />
      <GamesCPanel />
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

export default connect(null, mapDispatchToProps)(Home);
