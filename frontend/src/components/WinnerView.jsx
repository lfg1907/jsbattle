import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

const WinnerView = ({
  gameId,
  winner,
  getWinner,
  users,
  getUsers
}) => {
  useEffect(() => {
    getWinner(gameId);
    getUsers();
  }, []);
  const actualWinner = users.find(
    user => user.id === winner.userId
  );

  if (!actualWinner) return null;
  // console.log(ac);
  return (
    <div>
      <h5>The winner of this game is</h5>
      <h1>{actualWinner.username}</h1>
      <button>Return to Homepage</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getWinner: gameId =>
      dispatch(actions.getWinner(gameId)),
    getUsers: () => dispatch(actions.getUsers())
  };
};

const mapStateToProps = (
  { winner, users },
  { match: { params } }
) => ({
  winner,
  users,
  gameId: params.id
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WinnerView);
