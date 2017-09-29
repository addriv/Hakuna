import { combineReducers } from 'redux';
import { RECEIVE_TEAM } from '../actions/navigation_actions';
import { RECEIVE_PROJECT } from '../actions/project_actions';
import { RECEIVE_TASK } from '../actions/task_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const _defaultState = {};

export const entitiesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return _defaultState;
    case RECEIVE_TEAM:
      return action.teamData;
    case RECEIVE_PROJECT:
      return merge({}, state, action.project);
    case RECEIVE_TASK:
      return merge({}, state, action.task);
    default:
      return state;
  }
};
