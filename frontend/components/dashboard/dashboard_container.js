import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { logoutUser } from '../../actions/session_actions';
import { fetchTeam, fetchTeams  } from '../../actions/navigation_actions';
import { teamsSelector } from '../../reducers/selectors';

const mapStateToProps = state => ({
  teams: teamsSelector(state),
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  fetchTeams: () => dispatch(fetchTeams()),
  fetchTeam: (team) => dispatch(fetchTeam(team))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
