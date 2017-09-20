import { RECEIVE_PROJECT_DISPLAY } from '../actions/ui_actions';

const _defaultState = {
  projectDisplay: 0
};

export const uiReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_PROJECT_DISPLAY:
      return { projectDisplay: action.projectId };
    default:
      return state;
  }
};
