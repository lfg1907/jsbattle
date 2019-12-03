import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

const JoinGame = ({ games, joinGame }) => {
  const [selectedGameId, setSelectedGameId] = useState('');

  // useEffect(() => {
  //   setSelectedGame();
  // }, []);

  const handleSelect = (ev, gameId) => {
    const siblings = Array.from(
      ev.target.parentNode.children
    );
    siblings.forEach(elmt => {
      elmt.className = elmt.className.replace(
        'game-to-join',
        ''
      );
    });
    console.log(ev.target.className);
    ev.target.className = `${`${ev.target.className} game-to-join`}`;
    setSelectedGameId(gameId);
  };

  const handleSubmit = () => {
    const playerId = localStorage.getItem(
      'jsBattlePlayerId'
    );
    joinGame(selectedGameId, playerId);
  };

  return (
    <div id="join-game-container" className="rounded">
      <h3>Or join one</h3>
      <div id="games-list">
        {games.map(game => (
          <div
            className={
              !game.inProgress
                ? 'game inactive-game'
                : 'game'
            }
            key={game.id}
            role="radio"
            aria-checked="false"
            onClick={ev => handleSelect(ev, game.id)}
          >
            {!game.inProgress
              ? `${game.name} (Not Available)`
              : `${game.name} (${game.numOfPlayers}/3)`}
          </div>
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
  joinGame(gameId, playerId) {
    dispatch(actions.joinGame(gameId, playerId));
  }
});

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(JoinGame);
