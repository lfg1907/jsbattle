import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

import GamesCPanel from './GamesCPanel';
import UserStats from './UserStats';

const Home = ({ user, getUser }) => {
  useEffect(() => {
    getUser();
  }, []);

  const [name, setName] = useState('');
  useEffect(() => {
    if (user.id) {
      const nameToUse =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.username;

      setName(nameToUse);
    }
  }, [user.id]);

  return (
    <div id="home">
      <UserStats
        name={name}
        gamesWon={user.gamesWon}
        gamesPlayed={user.gamesPlayed}
      />
      <GamesCPanel />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getUser() {
    dispatch(actions.getUser());
  }
});

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
