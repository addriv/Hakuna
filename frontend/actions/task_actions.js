import * as taskUtil from '../util/task_util';

export const RECEIVE_TASK = 'RECEIVE_TASK';

export const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
});

export const createTask = task => dispatch => (
  taskUtil.createTask(task).then(
    response => dispatch(receiveTask(response))
  )
);
