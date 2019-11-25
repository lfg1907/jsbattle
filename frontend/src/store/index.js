import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import * as actions from './actions';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { actions };
