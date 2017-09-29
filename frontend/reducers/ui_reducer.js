import { RECEIVE_PROJECT_DISPLAY,
  RECEIVE_USER_DISPLAY, RECEIVE_TASK_DISPLAY } from '../actions/ui_actions';
import { RECEIVE_TEAM } from '../actions/navigation_actions';
import { RECEIVE_PROJECT } from '../actions/project_actions';
import merge from 'lodash/merge';

const _defaultState = {
  projectDisplay: 0,
  userDisplay: 0,
  taskDisplay: 0
};

export const uiReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_PROJECT:
      const projectId = parseInt(Object.keys(action.project.projects)[0]);
      return {
        projectDisplay: projectId,
        userDisplay: -1,
        taskDisplay: 0
      };
      // return merge({}, state, { projectDisplay: projectId } );
    case RECEIVE_PROJECT_DISPLAY:
      return {
        projectDisplay: action.projectId,
        userDisplay: -1,
        taskDisplay: 0
      };
      // return merge({}, state, { projectDisplay: action.projectId } );
    case RECEIVE_USER_DISPLAY:
      return {
        projectDisplay: 0,
        userDisplay: action.userId,
        taskDisplay: 0
      };
      // return merge({}, state, { userDisplay: action.userId });
    case RECEIVE_TASK_DISPLAY:
      const taskId = parseInt(Object.keys(action.task.tasks)[0]);
      return merge({}, state, { taskDisplay: taskId });
    case RECEIVE_TEAM:
      return _defaultState;
    default:
      return state;
  }
};
