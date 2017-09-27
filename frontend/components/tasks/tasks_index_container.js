import { connect } from 'react-redux';
import TasksIndex from './tasks_index';
import { tasksSelector } from '../../reducers/selectors';
// import { createProject } from '../../actions/project_actions';

const mapStateToProps = state => ({
  state,
  tasks: tasksSelector(state),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
