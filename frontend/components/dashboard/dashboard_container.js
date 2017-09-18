import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { logoutUser } from '../../actions/session_actions';

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
