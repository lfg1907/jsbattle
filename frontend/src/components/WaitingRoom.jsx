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
    <div id="waiting-room-container">
      <div id="waiting-room">
        <h2>{currentGame.name}</h2>
        <h2 className="light">
          {`Currently ${currentGame.numOfPlayers} ${
            currentGame.numOfPlayers > 1
              ? 'players'
              : 'player'
          } out of a maximum of ${currentGame.capacity}`}
        </h2>
        <h4>Waiting for players...</h4>
        <p>
          Invite others to join:
          <br />
          <span className="join-link">{`${window.location.origin}/#/join/${currentGame.id}`}</span>
        </p>
        {readyToStart ? (
          <button
            id="ready-button"
            type="button"
            onClick={handleReady}
          >
            Ready
          </button>
        ) : (
          ''
        )}
      </div>
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
