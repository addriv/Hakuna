import * as projectUtil from '../util/project_util';
import { fetchTeam } from './navigation_actions';

export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';

export const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project
});

export const createProject = project => dispatch => {
  let ajax = projectUtil.createProject(project);

  ajax.then(
    firstResponse => dispatch(receiveProject(firstResponse))
  );

  return ajax;
};

export const updateProject = project => dispatch => {
  let ajax = projectUtil.updateProject(project);

  ajax.then(
    response => dispatch(receiveProject(response))
  );

  return ajax;
};

export const deleteProject = project => dispatch => {
  return projectUtil.deleteProject(project)
    .then(
      response => dispatch(fetchTeam(project.team_id))
    );
};
