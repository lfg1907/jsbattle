import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

const WinnerView = ({
  gameId,
  winner,
  getWinner,
  users,
  getUsers,
  players,
  getPlayers
}) => {
  useEffect(() => {
    getWinner(gameId);
    getUsers();
    getPlayers();
  }, []);

  const actualWinner = users.find(
    user => user.id === winner.userId
  );
  if (!actualWinner) return null;
  const winPlayer = players.find(
    player => player.userId === winner.userId
  );
  if (!winPlayer) return null;
  return (
    <div>
      <p>The winner of this game is</p>
      <h3>{actualWinner.username}</h3>
      <p>with score: {winPlayer.score}            </p>
      <button id="home-button">
        {' '}
        <a href="/#/home">Return to Homepage</a>
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getWinner: gameId =>
      dispatch(actions.getWinner(gameId)),
    getUsers: () => dispatch(actions.getUsers()),
    getPlayers: () => dispatch(actions.getPlayers())
  };
};

const mapStateToProps = (
  { winner, users, players },
  { match: { params } }
) => ({
  winner,
  users,
  players,
  gameId: params.id
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WinnerView);
