import * as taskUtil from '../util/task_util';
import { fetchTeam } from './navigation_actions';
import { receiveTaskDisplay } from './ui_actions';

export const RECEIVE_TASK = 'RECEIVE_TASK';

export const receiveTask = task => ({
  type: RECEIVE_TASK,
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

export const deleteTask = task => dispatch => (
  taskUtil.deleteTask(task).then(
    response => {
      const taskId = parseInt(Object.keys(response.tasks)[0]);
      const teamId = response.tasks[taskId].team_id;
      dispatch(fetchTeam(teamId));
    }
  )
);
