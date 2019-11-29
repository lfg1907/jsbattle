import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import socket from '../socket';
import { actions } from '../store';

// Components
import Home from './Home';
import WaitingRoom from './WaitingRoom';
import EditorView from './EditorView';

const App = ({ addGameByOthers }) => {
  socket.on('game created', gameData => {
    const { game } = gameData;
    addGameByOthers(game);
  });

  return (
    <HashRouter>
      <Route path="/home" component={Home} />
      <Route path="/editor" component={EditorView} />
      <Route path="/waiting/:id" component={WaitingRoom} />
    </HashRouter>
  );
};

const mapDispatchToProps = dispatch => ({
  addGameByOthers(game) {
    dispatch(actions.addGame(game));
  }
});

export default connect(null, mapDispatchToProps)(App);
