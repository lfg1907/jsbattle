/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import {
  GET_GAME_QUESTIONS,
  FETCH_TEST_CASES,
  FETCH_TEST_RESULTS,
  FETCH_USER,
  FETCH_GAMES,
  CREATE_GAME,
  UPDATE_GAME
} from './constants';
import history from '../history';
import socket from '../socket';
import { sortByCreated } from '../utils';

const _getGameQuestions = questions => {
  return {
    questions,
    type: GET_GAME_QUESTIONS
  };
};

const getGameQuestions = gameId => {
  return async dispatch => {
    const questions = (
      await axios.get(`/api/games/${gameId}/questions`)
    ).data;
    return dispatch(_getGameQuestions(questions));
  };
};

const fetchTestCases = questionID => {
  return async dispatch => {
    const testCases = (
      await axios.get(
        `/api/questions/${questionID}/testcases`
      )
    ).data;
    dispatch({ type: FETCH_TEST_CASES, testCases });
  };
};

const fetchTestResults = (questionID, code) => {
  return async dispatch => {
    const testResults = (
      await axios.post(
        `/api/questions/${questionID}/runtests`,
        { code }
      )
    ).data;
    dispatch({ type: FETCH_TEST_RESULTS, testResults });
  };
};

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
    const sortedGames = sortByCreated(games);
    dispatch({ type: FETCH_GAMES, games: sortedGames });
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
    socket.emit('game created', { game });
    dispatch({ type: CREATE_GAME, game });
    history.push(`/waiting/${game.id}`);
  };
};

const joinGame = (gameId, playerId) => {
  return async dispatch => {
    const joinedGame = (
      await axios.put(`/api/games/${gameId}/join`, {
        playerId
      })
    ).data;
    socket.emit('join game', { game: joinedGame });
    dispatch({ type: UPDATE_GAME, game: joinedGame });
    history.push(`/waiting/${joinedGame.id}`);
  };
};

const addGame = game => {
  return dispatch => {
    dispatch({ type: CREATE_GAME, game });
  };
};

export {
  getGameQuestions,
  fetchTestCases,
  fetchTestResults,
  getUser,
  getGames,
  createGame,
  addGame,
  joinGame
};
