import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import history from '../history';
import socket from '../socket';
import { actions } from '../store';

const WaitingRoom = ({
  game,
  match: { params },
  getQuestions
}) => {
  useEffect(() => {
    getQuestions(game.id);
  }, []);

  const [currentGame, setCurrentGame] = useState(game);
  socket.on('game joined', gameData => {
    if (gameData.game.id === params.id) {
      setCurrentGame(gameData.game);
    }
  });

  const [readyToStart, setReadyToStart] = useState(false);
  useEffect(() => {
    if (currentGame.numOfPlayers > 1) {
      setReadyToStart(true);
    }
  }, [currentGame]);

  const handleReady = ev => {
    // eslint-disable-next-line no-param-reassign
    ev.target.disabled = true;
    socket.emit('player ready', { game: currentGame });
  };

  socket.on('game ready', gameData => {
    // When all players are ready, game is ready
    const { gameId } = gameData;
    if (gameId === params.id) {
      history.push(`/game/${gameId}`);
    }
  });

  return (
    <div>
      <h2>{`Waiting Room for ${currentGame.name}`}</h2>
      <p>
        {`Currently ${currentGame.numOfPlayers} ${
          currentGame.numOfPlayers > 1
            ? 'players'
            : 'player'
        } out of 3`}
      </p>
      {readyToStart ? (
        <button type="button" onClick={handleReady}>
          Ready
        </button>
      ) : (
        <p>Waiting for other players to join</p>
      )}
    </div>
  );
};

const mapStateToProps = (
  { games },
  { match: { params } }
) => ({
  game: games.find(_game => _game.id === params.id)
});

const mapDispatchToProps = dispatch => ({
  getQuestions(gameId) {
    dispatch(actions.getGameQuestions(gameId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingRoom);
