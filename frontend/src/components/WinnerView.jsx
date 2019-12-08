import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

const WinnerView = ({ gameId, winner, getWinner }) => {
  // const winner = getWinner(
  //   '64906ecc-15e2-4959-9a3a-453910389061'
  // )
  useEffect(() => {
    getWinner(gameId);
  }, []);

  return (
    <div>
      <h5>The winner of this game is</h5>
      <h1>{winnerName}</h1>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getWinner: gameId => dispatch(actions.getWinner(gameId))
  };
};

const mapStateToProps = (
  { winner, players },
  { match: { params } }
) => ({
  winner,
  gameId: params.id,
  players
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WinnerView);
