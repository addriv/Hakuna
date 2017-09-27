import { connect } from 'react-redux';
import TasksDetail from './tasks_detail';
import { updateTask } from '../../actions/task_actions';

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  updateTask: task => dispatch(updateTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksDetail);
