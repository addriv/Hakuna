import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _defaultState = {
  current_user: null
};

export const sessionReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return (
        { currentUser: action.currentUser }
      );
    default:
      return state;
  }
};
