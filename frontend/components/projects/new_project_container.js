import { connect } from 'react-redux';
import NewProjectModal from './new_project_modal';
import { createProject } from '../../actions/project_actions';

const mapStateToProps = state => ({
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({
  createProject: project => dispatch(createProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectModal);
