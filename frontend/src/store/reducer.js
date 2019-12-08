import { combineReducers } from 'redux';
import {
  SET_GAME_SOCKET,
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

const gameQuestionsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_GAME_QUESTIONS:
      return action.questions;
    case UPDATE_QUESTION:
      return state.map(question => {
        return question.id === action.updated.id
          ? action.updated
          : question;
      });
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.user;
    default:
      return state;
  }
};

const gamesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_GAMES:
      return action.games;
    case CREATE_GAME:
      return [action.game, ...state];
    case UPDATE_GAME:
      return state.map(game => {
        if (game.id === action.game.id) {
          return action.game;
        }
        return game;
      });
    default:
      return state;
  }
};

const testCaseReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TEST_CASES:
      return action.testCases;
    default:
      return state;
  }
};

const testResultsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TEST_RESULTS:
      return action.testResults;
    default:
      return state;
  }
};

const playerReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PLAYER:
      return action.player;
    case UPDATE_SCORE:
      return action.updated;
    default:
      return state;
  }
};

const gameSocketReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_GAME_SOCKET:
      return action.gameSocket;
    default:
      return state;
  }
};

const reducer = combineReducers({
  gameQuestions: gameQuestionsReducer,
  user: userReducer,
  games: gamesReducer,
  testCases: testCaseReducer,
  testResults: testResultsReducer,
  player: playerReducer,
  gameSocket: gameSocketReducer
});

export default reducer;
