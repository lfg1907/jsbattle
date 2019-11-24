import { combineReducers } from 'redux';
import { SET_QUESTION } from './constants';

const questionReducer = (state = [], action) => {
  switch (action.type) {
    case SET_QUESTION:
      return action.question;
    default:
      return state;
  }
};

const reducer = combineReducers({
  questions: questionReducer
});

export default reducer;
