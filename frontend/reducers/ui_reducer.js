import { RECEIVE_PROJECT_DISPLAY,
  RECEIVE_USER_DISPLAY } from '../actions/ui_actions';
import { RECEIVE_TEAM } from '../actions/navigation_actions';
import merge from 'lodash/merge';

const _defaultState = {
  projectDisplay: 0,
  userDisplay: -1
};

export const uiReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_PROJECT_DISPLAY:
      return merge({}, state, { projectDisplay: action.projectId } );
    case RECEIVE_USER_DISPLAY:
      return merge({}, state, { userDisplay: action.userDisplayId });
    case RECEIVE_TEAM:
      return _defaultState;
    default:
      return state;
  }
};
