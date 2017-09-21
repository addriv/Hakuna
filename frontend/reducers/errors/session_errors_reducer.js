import { RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS } from '../../actions/errors_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';

export const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return [];
    default:
      return state;
  }
};
