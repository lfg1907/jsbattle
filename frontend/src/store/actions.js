import axios from 'axios';

import {
  FETCH_USER,
  FETCH_GAMES,
  CREATE_GAME
} from './constants';
import history from '../history';

// This is a temporary implementation
// the first user is always fetched
const getUser = () => {
  return async dispatch => {
    const users = (await axios.get('/api/users')).data;
    const user = users[0];
    localStorage.setItem('jsBattleUserId', user.id);
    dispatch({ type: FETCH_USER, user });
  };
};

const getGames = () => {
  return async dispatch => {
    const games = (await axios.get('/api/games')).data;
    dispatch({ type: FETCH_GAMES, games });
  };
};

const createGame = name => {
  const userId = localStorage.getItem('jsBattleUserId');
  return async dispatch => {
    const player = (
      await axios.post('/api/players', { userId })
    ).data;

    localStorage.setItem(
      'jsBattlePlayerId',
      `${player.id}`
    );

    const game = (
      await axios.post('/api/games', {
        name,
        playerId: player.id
      })
    ).data;
    dispatch({ type: CREATE_GAME, game });
    history.push(`/waiting/${game.id}`);
  };
};

export { getUser, getGames, createGame };
