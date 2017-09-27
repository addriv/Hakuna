import { connect } from 'react-redux';
import TasksIndex from './tasks_index';
import { tasksSelector } from '../../reducers/selectors';
import { createTask } from '../../actions/task_actions';

const mapStateToProps = state => ({
  state,
  tasks: tasksSelector(state),
});

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
