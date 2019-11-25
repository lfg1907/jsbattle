import { combineReducers } from 'redux';

import { FETCH_GAMES, CREATE_GAME } from './constants';

const questionReducer = (state = []) => {
  return state;
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
  games: gamesReducer
});

export default reducer;
