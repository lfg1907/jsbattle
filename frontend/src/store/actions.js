/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import {
  GET_GAME_QUESTIONS,
  UPDATE_QUESTION,
  FETCH_TEST_CASES,
  FETCH_TEST_RESULTS,
  FETCH_PLAYER,
  FETCH_USER,
  FETCH_GAMES,
  CREATE_GAME,
  UPDATE_GAME,
  UPDATE_SCORE
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

const updateScore = (playerID, amt) => {
  return async dispatch => {
    const updated = (
      await axios.put(`/api/players/${playerID}`, {
        score: amt
      })
    ).data;
    return dispatch({ type: UPDATE_SCORE, updated });
  };
};

const completeQuestion = gameQuestionId => {
  return async dispatch => {
    const updated = (
      await axios.put(
        `/api/games/question/${gameQuestionId}`,
        { completed: true }
      )
    ).data;
    return dispatch({ type: UPDATE_QUESTION, updated });
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
      await axios.post(`/api/questions/${questionID}`, {
        code
      })
    ).data;
    dispatch({ type: FETCH_TEST_RESULTS, testResults });
  };
};

const getPlayer = playerID => {
  return async dispatch => {
    const player = (
      await axios.get(`/api/players/${playerID}`)
    ).data;
    dispatch({ type: FETCH_PLAYER, player });
  };
};

// This is a temporary implementation
// the first user is always fetched
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
    const sortedGames = sortByCreated(games);
    dispatch({ type: FETCH_GAMES, games: sortedGames });
  };
};

const createGame = (name, capacity, difficulty) => {
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
        capacity,
        playerId: player.id,
        difficulty
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

const updateGame = updatedGame => {
  return dispatch => {
    dispatch({ type: UPDATE_GAME, game: updatedGame });
  };
};

const addGame = game => {
  return dispatch => {
    dispatch({ type: CREATE_GAME, game });
  };
};

export {
  getGameQuestions,
  updateScore,
  completeQuestion,
  fetchTestCases,
  fetchTestResults,
  getPlayer,
  getUser,
  getGames,
  createGame,
  addGame,
  joinGame,
  updateGame
};
