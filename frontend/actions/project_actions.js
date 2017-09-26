import * as projectUtil from '../util/project_util';

export const RECEIVE_NEW_PROJECT = 'RECEIVE_NEW_PROJECT';

export const receiveNewProject = project => ({
  type: RECEIVE_NEW_PROJECT,
  project
});

export const createProject = project => dispatch => {
  let ajax = projectUtil.createProject(project);

  ajax.then(
    response => dispatch(receiveNewProject(response))
  );

  return ajax;
};
