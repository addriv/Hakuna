export const RECEIVE_PROJECT_DISPLAY = 'RECEIVE_PROJECT_DISPLAY';
export const RECEIVE_TASK_DISPLAY = 'RECEIVE_TASK_DISPLAY';

export const receiveProjectDisplay = projectId => ({
  type: RECEIVE_PROJECT_DISPLAY,
  projectId
  }
);

export const receiveTaskDisplay = task => ({
  type: RECEIVE_TASK_DISPLAY,
  task
});
