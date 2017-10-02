import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { teamMembersSelector,
  projectsSelector, currentUserInitials } from '../../reducers/selectors';
import { receiveProjectDisplay,
  receiveUserDisplay } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  entities: state.entities,
  teamMembers: teamMembersSelector(state),
  projects: projectsSelector(state),
  currentUserInitials: currentUserInitials(state),
  currentUser: state.session.currentUser,
  uiDisplay: state.ui
});

const mapDispatchToProps = dispatch => ({
  displayProject: projectId => dispatch(receiveProjectDisplay(projectId)),
  displayUser: userId => dispatch(receiveUserDisplay(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
