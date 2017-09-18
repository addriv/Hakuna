import { connect } from 'react-redux';
import LoginForm from './login_form';
import { loginUser } from '../../actions/session_actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  login: userData =>  dispatch(loginUser(userData))
});

export default connect(null, mapDispatchToProps)(LoginForm);
