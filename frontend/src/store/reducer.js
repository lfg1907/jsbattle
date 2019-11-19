import { combineReducers } from 'redux';

const questionReducer = (state = []) => {
  return state;
};

const reducer = combineReducers({
  questions: questionReducer
});

export default reducer;
