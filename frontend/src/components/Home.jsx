import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

import GamesCPanel from './GamesCPanel';
import UserStats from './UserStats';

const Home = ({ loadGames }) => {
  useEffect(() => {
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
  loadGames() {
    dispatch(actions.getUser());
    dispatch(actions.getGames());
  }
});

export default connect(null, mapDispatchToProps)(Home);
