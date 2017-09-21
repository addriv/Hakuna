import { combineReducers } from 'redux';
import { currentUserReducer } from './current_user_reducer';
import { teamsReducer } from './teams_reducer';
import merge from 'lodash/merge';

export const sessionReducer = combineReducers({
  currentUser: currentUserReducer,
  teams: teamsReducer
});
