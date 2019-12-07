import axios from 'axios';

import { isError } from 'util';
import {
  FETCH_USER,
  FETCH_GAMES,
  CREATE_GAME
} from './constants';

import history from '../history';

const getUser = () => {
  return async dispatch => {
    const user = (
      await axios.get('/api/auth/login/github_user')
    ).data;
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
