import { connect } from 'react-redux';
import TasksDetail from './tasks_detail';
// import { tasksSelector } from '../../reducers/selectors';
// import { createProject } from '../../actions/project_actions';

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TasksDetail);
