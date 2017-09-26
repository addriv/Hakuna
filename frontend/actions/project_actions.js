import * as projectUtil from '../util/project_util';

export const RECEIVE_PROJECT = 'RECEIVE_NEW_PROJECT';

export const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project
});

export const createProject = project => dispatch => {
  let ajax = projectUtil.createProject(project);

  ajax.then(
    response => dispatch(receiveProject(response))
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
