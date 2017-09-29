import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/root_reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  // must use 'require' (import only allowed at top of file)
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export const configureStore = (preloadedState) => (
  createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))
);
