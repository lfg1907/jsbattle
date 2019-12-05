import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';

import EditorView from './EditorView';
import QuestionView from './QuestionView';

const GameView = ({
  game,
  gameQuestions,
  currentQ,
  getGameQuestions
}) => {
  useEffect(() => {
    getGameQuestions(game.id);
  }, []);

  if (!gameQuestions.length) {
    return '...loading';
  }

  if (!currentQ) {
    return 'game is done';
  }

  return (
    <div id="game-view">
      <h2>{`Game ${game.name}`}</h2>
      <div id="game-container">
        <QuestionView currentQ={currentQ} />
        <EditorView currentQ={currentQ} />
      </div>
    </div>
  );
};

const mapStateToProps = (
  { games, gameQuestions },
  { match: { params } }
) => ({
  game: games.find(_game => _game.id === params.id),
  gameQuestions,
  // return the first incomplete question
  currentQ: gameQuestions.find(gameQ => !gameQ.completed)
});

const mapDispatchToProps = dispatch => ({
  getGameQuestions(gameId) {
    dispatch(actions.getGameQuestions(gameId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);
