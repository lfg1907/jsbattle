import { combineReducers } from 'redux';
import {
  GET_ALL_QUESTIONS,
  FETCH_TEST_CASES,
  FETCH_USER,
  FETCH_GAMES,
  CREATE_GAME
} from './constants';

const questionReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return action.questions;
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

const reducer = combineReducers({
  questions: questionReducer,
  user: userReducer,
  games: gamesReducer,
  testCases: testCaseReducer
});

export default reducer;
