import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../store';
import history from '../history';

import EditorView from './EditorView';
import QuestionView from './QuestionView';

const GameView = ({
  game,
  gameQuestions,
  incompleteQ,
  getGameQuestions
}) => {
  if (!incompleteQ) {
    console.log('game is done');
    history.push(`/winner/${game.id}`);
    return null;
  }

  useEffect(() => {
    getGameQuestions(game.id);
  }, []);

  const [currentQ, setCurrentQ] = useState(incompleteQ);
  useEffect(() => {
    setCurrentQ(incompleteQ);
  }, [incompleteQ.id]);

  if (!gameQuestions.length || !game) {
    return '...loading';
  }

  return (
    <div id="game-view">
      <h2>{`Game ${game.name}`}</h2>
      <div id="game-container">
        <QuestionView currentQ={currentQ} />
        <EditorView currentQ={currentQ} game={game} />
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
  incompleteQ: gameQuestions.find(gameQ => !gameQ.completed)
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
