import React from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

const WinnerView = ({ game, getWinner }) => {
  console.log(game)
  const winner = getWinner(game.id);
  return (
    <div>
      <h5>
        The winner of this game is
        <h1>{winner}</h1>
      </h5>
    </div>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    getWinner: gameId => dispatch(actions.getWinner(gameId))
  };
};
const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WinnerView);
