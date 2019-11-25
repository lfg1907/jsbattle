import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';

import { actions } from '../store';
import { titleCase } from '../utils';

const CreateGame = ({ createGame }) => {
  const [gameName, setGameName] = useState('');

  useEffect(() => {
    const tempName = titleCase(
      `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`
    );
    setGameName(tempName);
  }, []);

  const handleChange = ev => {
    setGameName(ev.target.value);
  };

  const handleSubmit = () => {
    createGame(gameName);
  };

  return (
    <div id="create-game-container" className="rounded">
      <input
        type="text"
        value={gameName}
        onChange={handleChange}
      />
      <br />
      <button type="button" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createGame(name) {
    dispatch(actions.createGame(name));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CreateGame);
