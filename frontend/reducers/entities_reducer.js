import { combineReducers } from 'redux';
import { RECEIVE_TEAM } from '../actions/navigation_actions';
import { RECEIVE_PROJECT } from '../actions/project_actions';
import { RECEIVE_TASK } from '../actions/task_actions';
import merge from 'lodash/merge';

export const entitiesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TEAM:
      return action.teamData;
    case RECEIVE_PROJECT:
      const newState = merge({}, state, action.project);
      return newState;
    case RECEIVE_TASK:
      return merge({}, state, action.task);
    default:
      return state;
  }
};
