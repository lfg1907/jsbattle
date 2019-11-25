import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const JoinGame = ({ games }) => {
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
    console.log(selectedGameId);
    // dispatch
  };

  return (
    <div id="join-game-container" className="rounded">
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
            {game.name}
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

export default connect(mapStateToprops)(JoinGame);
