import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session_errors_reducer';

export const errorsReducer = combineReducers({
  session: sessionErrorsReducer
});
