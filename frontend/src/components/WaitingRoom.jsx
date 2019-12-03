import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import history from '../history';
import socket, { ADDRESS } from '../socket';
import { actions } from '../store';

const WaitingRoom = ({ game, getQuestions }) => {
  const gameSocket = io.connect(`${ADDRESS}/game`);
  useEffect(() => {
    socket.emit('join game', { game });

    gameSocket.on('connect', () => {
      gameSocket.emit('join room', { game });
    });

    getQuestions(game.id);
  }, []);

  const [currentGame, setCurrentGame] = useState(game);
  gameSocket.on('room joined', gameData => {
    setCurrentGame(gameData.game);
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
    gameSocket.emit('player ready', { game: currentGame });
  };

  gameSocket.on('game ready', () => {
    // When all players are ready, game is ready
    history.push(`/game/${currentGame.id}`);
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
