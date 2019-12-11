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
    <div id="winner-container">
      <div id="winner">
        <p>The winner of this game is</p>
        <h2>{actualWinner.username}</h2>
        <p>with score:</p>
        <h3>{winPlayer.score}</h3>
        <a href="/#/home">
          <button type="button" id="home-button">
            Return to Homepage
          </button>
        </a>
      </div>
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
