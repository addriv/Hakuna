import { combineReducers } from 'redux';
import { sessionReducer } from './session_reducer';
import { errorsReducer } from './errors_reducer';
import { entitiesReducer } from './entities_reducer';
import { uiReducer } from './ui_reducer';

export const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  entities: entitiesReducer,
  ui: uiReducer
});
