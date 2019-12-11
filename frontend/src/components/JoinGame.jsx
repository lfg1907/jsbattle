import React, { useState } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

import GameToJoinItem from './GameToJoinItem';

const JoinGame = ({ games, joinGame }) => {
  const [selectedGameId, setSelectedGameId] = useState('');

  const handleSelect = (ev, gameId) => {
    if (ev.target.className.includes('icon-')) return;

    const siblings = Array.from(
      ev.target.parentNode.children
    );
    siblings.forEach(elmt => {
      elmt.className = elmt.className.replace(
        ' game-to-join',
        ''
      );
    });
    ev.target.className = `${`${ev.target.className} game-to-join`}`;
    setSelectedGameId(gameId);
  };

  const handleSubmit = () => {
    const userId = localStorage.getItem('jsBattleUserId');
    joinGame(selectedGameId, userId);
  };

  return (
    <div id="join-game-container">
      <h3>Or join one</h3>
      <div id="games-list">
        {games.map(game => (
          <GameToJoinItem
            key={game.id}
            game={game}
            handleSelect={handleSelect}
          />
        ))}
      </div>
      <button type="button" onClick={handleSubmit}>
        Join
      </button>
    </div>
  );
};

const mapStateToprops = ({ games }) => ({ games });

const mapDispatchToProps = dispatch => ({
  joinGame(gameId, userId) {
    dispatch(actions.joinGame(gameId, userId));
  }
});

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(JoinGame);
