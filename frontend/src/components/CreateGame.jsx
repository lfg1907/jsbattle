import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';

import { actions } from '../store';
import { titleCase } from '../utils';

const CreateGame = ({ createGame }) => {
  const [gameName, setGameName] = useState('');
  const [gameCap, setGameCap] = useState(3);

  useEffect(() => {
    const tempName = titleCase(
      `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`
    );
    setGameName(tempName);
  }, []);

  const handleChange = ev => {
    setGameName(ev.target.value);
  };

  const handleCapChange = ev => {
    setGameCap(parseInt(ev.target.value, 10));
  };

  const handleSubmit = () => {
    createGame(gameName, gameCap);
  };

  return (
    <div id="create-game-container">
      <h3>Create a game</h3>
      <input
        type="text"
        value={gameName}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="cap">
        Capacity:
        <input
          name="cap"
          type="text"
          value={gameCap}
          onChange={handleCapChange}
        />
      </label>
      <button type="button" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createGame(name, capacity) {
    dispatch(actions.createGame(name, capacity));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CreateGame);
