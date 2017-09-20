import { RECEIVE_PROJECT_DISPLAY } from '../actions/ui_actions';
import { RECEIVE_TEAM } from '../actions/navigation_actions';

const _defaultState = {
  projectDisplay: 0
};

export const uiReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_PROJECT_DISPLAY:
      return { projectDisplay: action.projectId };
    case RECEIVE_TEAM:
      return _defaultState;
    default:
      return state;
  }
};
