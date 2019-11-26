import { combineReducers } from 'redux';
import { GET_ALL_QUESTIONS } from './constants';

const questionReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return action.questions;
    default:
      return state;
  }
};

const reducer = combineReducers({
  questions: questionReducer
});

export default reducer;
