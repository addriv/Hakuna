import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { teamMembersSelector, projectsSelector } from '../../reducers/selectors';
import { receiveProjectDisplay } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  entities: state.entities,
  teamMembers: teamMembersSelector(state),
  projects: projectsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  displayProject: (projectId) => dispatch(receiveProjectDisplay(projectId)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
