import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';
import history from '../history';

const JoinFromLink = ({
  games,
  match: { params },
  loadGames,
  joinGame
}) => {
  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    if (games.length) {
      const gameId = params.id;
      const userId = localStorage.getItem('jsBattleUserId');

      joinGame(gameId, userId);
      history.push(`/waiting/${gameId}`);
    }
  }, [games.length]);

  if (!games.length) return null;

  return (
    <div>
      <h2>Joining...</h2>
    </div>
  );
};

const mapStateToProps = ({ games }) => ({ games });

const mapDispatchToProps = dispatch => ({
  loadGames() {
    dispatch(actions.getGames());
  },
  joinGame(gameId, userId) {
    dispatch(actions.joinGame(gameId, userId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinFromLink);
