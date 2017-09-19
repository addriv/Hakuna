import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signupUser } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  signup: userData =>  dispatch(signupUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
