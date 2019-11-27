import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as actions from './actions';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { actions };
