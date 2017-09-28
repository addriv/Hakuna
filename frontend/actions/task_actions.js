import * as taskUtil from '../util/task_util';

export const RECEIVE_TASK = 'RECEIVE_TASK';
export const RECEIVE_TASK_DISPLAY = 'RECEIVE_TASK_DISPLAY';

export const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
});

export const receiveTaskDisplay = task => ({
  type: RECEIVE_TASK_DISPLAY,
  task
});

export const createTask = task => dispatch => {
  const ajax = taskUtil.createTask(task);
  ajax.then(
    response => {
      dispatch(receiveTask(response));
    }
  ).then(
    response => {
      dispatch(receiveTaskDisplay(ajax.responseJSON));
    }
  );

  return ajax;
};

export const updateTask = task => dispatch => (
  taskUtil.updateTask(task).then(
    response => dispatch(receiveTask(response))
  )
);
