import { RECEIVE_TEAMS } from '../actions/session_actions';

export const teamsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TEAMS:
      return action.teams;
    default:
      return state;
  }
};
