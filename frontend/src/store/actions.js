/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import {
  GET_ALL_QUESTIONS,
  FETCH_TEST_CASES,
  FETCH_USER,
  FETCH_GAMES,
  CREATE_GAME
} from './constants';
import history from '../history';

const _getAllQuestions = questions => {
  return {
    questions,
    type: GET_ALL_QUESTIONS
  };
};

const getAllQuestions = () => {
  return async dispatch => {
    const questions = (await axios.get('/api/questions'))
      .data;
    return dispatch(_getAllQuestions(questions));
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

export {
  getAllQuestions,
  fetchTestCases,
  getUser,
  getGames,
  createGame
};
