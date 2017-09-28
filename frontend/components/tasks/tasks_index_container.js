import { connect } from 'react-redux';
import TasksIndex from './tasks_index';
import { tasksSelector } from '../../reducers/selectors';
import { createTask, receiveTaskDisplay, updateTask } from '../../actions/task_actions';

const mapStateToProps = state => ({
  state,
  tasks: tasksSelector(state),
});

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task)),
  receiveTaskDisplay: task => dispatch(receiveTaskDisplay(task)),
  updateTask: task => dispatch(updateTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
