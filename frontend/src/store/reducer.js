import { combineReducers } from 'redux';

import {
  FETCH_USER,
  FETCH_GAMES,
  CREATE_GAME
} from './constants';

const questionReducer = (state = []) => {
  return state;
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

const reducer = combineReducers({
  questions: questionReducer,
  user: userReducer,
  games: gamesReducer
});

export default reducer;
