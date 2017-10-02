import { connect } from 'react-redux';
import TasksIndex from './tasks_index';
import { tasksSelector } from '../../reducers/selectors';
import { createTask, updateTask } from '../../actions/task_actions';
import { receiveTaskDisplay } from '../../actions/ui_actions';
import { createProject } from '../../actions/project_actions';

const mapStateToProps = state => ({
  state,
  tasks: tasksSelector(state),
});

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task)),
  receiveTaskDisplay: task => dispatch(receiveTaskDisplay(task)),
  updateTask: task => dispatch(updateTask(task)),
  createProject: project => dispatch(createProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
