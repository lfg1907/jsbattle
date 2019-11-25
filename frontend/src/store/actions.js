import axios from 'axios';

import { FETCH_GAMES, CREATE_GAME } from './constants';
import history from '../history';

const getUser = () => {
  return async () => {
    const users = (await axios.get('/api/users')).data;
    const userId = users[0].id;
    localStorage.setItem('jsBattleUserId', userId);
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
