import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { logoutUser } from '../../actions/session_actions';
import { fetchTeam, fetchTeams  } from '../../actions/navigation_actions';
import { teamsSelector, tasksSelector,
  currentUserInitials } from '../../reducers/selectors';
import { receiveUserDisplay } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  teams: teamsSelector(state),
  entities: state.entities,
  tasks: tasksSelector(state),
  uiDisplay: state.ui,
  userInitials: currentUserInitials(state),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  fetchTeams: () => dispatch(fetchTeams()),
  fetchTeam: team => dispatch(fetchTeam(team)),
  receiveUserDisplay: userId => dispatch(receiveUserDisplay(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
