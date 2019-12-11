import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';

import { actions } from '../store';
import { titleCase } from '../utils';

const CreateGame = ({ createGame }) => {
  const diffLevels = ['Easy', 'Medium', 'Hard'];
  const [gameName, setGameName] = useState('');
  const [gameCap, setGameCap] = useState(3);
  const [gameDiff, setGameDiff] = useState(
    diffLevels[0].toUpperCase()
  );

  useEffect(() => {
    const tempName = titleCase(
      `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`
    );
    setGameName(tempName);
  }, []);

  const handleNameChange = ev => {
    setGameName(ev.target.value);
  };

  const handleDiffChange = ev => {
    if (ev.target.className.includes('icon-')) return;
    setGameDiff(ev.target.id);
  };

  const handleCapChange = ev => {
    setGameCap(parseInt(ev.target.value, 10));
  };

  const handleSubmit = () => {
    createGame(gameName, gameCap, gameDiff);
  };

  return (
    <div id="create-game-container">
      <h3>Create a game</h3>
      <div id="game-name">
        {/* eslint-disable-next-line */}
        <label
          id="game-name-label"
          htmlFor="game-name-input"
        >
          Game name
        </label>
        <input
          id="game-name-input"
          type="text"
          value={gameName}
          onChange={handleNameChange}
        />
      </div>

      <div id="capacity-container">
        {/* eslint-disable-next-line */}
        <label id="capacity-label" htmlFor="capacity-input">
          Capacity
        </label>
        <input
          id="capacity-input"
          name="cap"
          type="number"
          value={gameCap}
          onChange={handleCapChange}
        />
      </div>

      <div id="difficulty-container">
        <div id="difficulty-label">Difficulty</div>
        <div id="difficulty-input">
          <div id="levels-container">
            {diffLevels.map(diffLevel => (
              // eslint-disable-next-line
              <div
                key={diffLevel}
                role="radio"
                aria-checked="false"
                className={
                  diffLevel.toUpperCase() === gameDiff
                    ? 'no-select difficulty selected'
                    : 'no-select difficulty'
                }
                id={diffLevel.toUpperCase()}
                onClick={handleDiffChange}
              >
                <div
                  className={`icon-${diffLevel.toUpperCase()}`}
                />
                {diffLevel}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button type="button" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createGame(name, capacity, difficulty) {
    dispatch(
      actions.createGame(name, capacity, difficulty)
    );
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CreateGame);
