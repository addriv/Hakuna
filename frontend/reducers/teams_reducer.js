import { RECEIVE_TEAMS } from '../actions/session_actions';

export const teamsReducer = (state = {}, action) => {
  debugger;
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TEAMS:
      debugger;
      return action.teams;
    default:
      return state;
  }
};
