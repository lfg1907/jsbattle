import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { ADDRESS } from '../socket';
import history from '../history';
import { actions } from '../store';

const WaitingRoom = ({
  game,
  getQuestions,
  setGameSocket
}) => {
  if (!game) return null;

  const gameSocket = io.connect(`${ADDRESS}/game`);

  useEffect(() => {
    gameSocket.on('connect', () => {
      gameSocket.emit('join room', { game });
    });
    setGameSocket(gameSocket);
    getQuestions(game.id);
  }, []);

  const [currentGame, setCurrentGame] = useState(game);
  gameSocket.on('room joined', gameData => {
    const newGame = gameData.game;
    setCurrentGame(newGame);
  });
  useEffect(() => {
    setCurrentGame(game);
  }, [game.numOfPlayers]);

  const [readyToStart, setReadyToStart] = useState(false);
  useEffect(() => {
    if (
      currentGame.numOfPlayers > 1 ||
      currentGame.capacity === 1
    ) {
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
        } out of a maximum of ${currentGame.capacity}`}
      </p>
      <p>{`Path to join game: ${window.location.origin}/#/join/${currentGame.id}`}</p>
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
  },
  setGameSocket: gameSocket => {
    dispatch(actions.setGameSocket(gameSocket));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingRoom);
