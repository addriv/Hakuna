import { RECEIVE_CURRENT_USER, RECEIVE_TEAMS } from '../actions/session_actions';
import merge from 'lodash/merge';

const _defaultState = {
  current_user: null
};

export const sessionReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.currentUser };
    case RECEIVE_TEAMS:
      return  merge({}, state, { teams: action.teams });
    default:
      return state;
  }
};
