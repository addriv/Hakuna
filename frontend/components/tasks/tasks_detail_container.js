import { connect } from 'react-redux';
import TasksDetail from './tasks_detail';
import { updateTask, deleteTask } from '../../actions/task_actions';

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: task => dispatch(deleteTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksDetail);
