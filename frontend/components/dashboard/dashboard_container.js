import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { logoutUser } from '../../actions/session_actions';
import { fetchTeam } from '../../actions/navigation_actions';

const mapStateToProps = state => ({
  teams: state.session.teams
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  fetchTeam: (team) => dispatch(fetchTeam(team))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
