import * as projectUtil from '../util/project_util';

export const RECEIVE_NEW_PROJECT = 'RECEIVE_NEW_PROJECT';

export const receiveNewProject = project => ({
  type: RECEIVE_NEW_PROJECT,
  project
});

export const createProject = project => dispatch => {
  projectUtil.createProject(project)
    .then(
      response => dispatch(receiveNewProject(response))
    );
};
