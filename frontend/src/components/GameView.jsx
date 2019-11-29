import React from 'react';
import { connect } from 'react-redux';

const GameView = ({ game, questions }) => {
  return (
    <div>
      <h2>{`Game ${game.name}`}</h2>
    </div>
  );
};

const mapStateToProps = (
  { games, questions },
  { match: { params } }
) => ({
  game: games.find(_game => _game.id === params.id),
  questions
});

export default connect(mapStateToProps)(GameView);
