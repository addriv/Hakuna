import { RECEIVE_PROJECT_DISPLAY,
  RECEIVE_USER_DISPLAY } from '../actions/ui_actions';
import { RECEIVE_TEAM } from '../actions/navigation_actions';
import { RECEIVE_PROJECT } from '../actions/project_actions';
import { RECEIVE_TASK } from '../actions/task_actions';
import merge from 'lodash/merge';

const _defaultState = {
  projectDisplay: 0,
  userDisplay: -1,
  taskDisplay: 0
};

export const uiReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_PROJECT:
      const projectId = parseInt(Object.keys(action.project.projects)[0]);
      return merge({}, state, { projectDisplay: projectId } );
    case RECEIVE_PROJECT_DISPLAY:
      return merge({}, state, { projectDisplay: action.projectId } );
    case RECEIVE_USER_DISPLAY:
      return merge({}, state, { userDisplay: action.userDisplayId });
    case RECEIVE_TASK:
      const taskId = parseInt(Object.keys(action.task.tasks)[0]);
      return merge({}, state, { taskDisplay: taskId });
    case RECEIVE_TEAM:
      return _defaultState;
    default:
      return state;
  }
};
