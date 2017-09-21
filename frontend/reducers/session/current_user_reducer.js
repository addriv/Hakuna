import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_TEAMS } from '../../actions/navigation_actions';
import { RECEIVE_NEW_TEAM } from '../../actions/account_actions';

export const currentUserReducer = (state = null, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
};
