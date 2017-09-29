export const RECEIVE_PROJECT_DISPLAY = 'RECEIVE_PROJECT_DISPLAY';
export const RECEIVE_TASK_DISPLAY = 'RECEIVE_TASK_DISPLAY';
export const RECEIVE_USER_DISPLAY = 'RECEIVE_USER_DISPLAY';

export const receiveProjectDisplay = projectId => ({
  type: RECEIVE_PROJECT_DISPLAY,
  projectId
  }
);

export const receiveTaskDisplay = task => ({
  type: RECEIVE_TASK_DISPLAY,
  task
});

export const receiveUserDisplay = userId => ({
  type: RECEIVE_USER_DISPLAY,
  userId
});
