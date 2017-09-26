import { connect } from 'react-redux';
import EditProjectModal from './edit_project_modal';
import { updateProject } from '../../actions/project_actions';

const mapStateToProps = state => ({
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({
  updateProject: project => dispatch(updateProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectModal);
